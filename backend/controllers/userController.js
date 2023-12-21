import bcrypt from "bcryptjs";
import generateToken from "../utils/helpers/generateToken.js";
import errorHandler from "../utils/helpers/errorHandler.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !validPassword)
      return res.status(400).json({ error: "Invalid username or password" });

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === String(req.user._id))
      return res.status(400).json({ error: "Unable to follow own user" });
    if (!userToFollow || !currentUser)
      return res.status(400).json({ error: "User not found" });
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, username, email, password, bio } = req.body;
    let { profilePic } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    if (id !== String(userId))
      return res.status(401).json({ error: "Unauthorized" });

    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        const profilePicId = user.profilePic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`Twine/users/${profilePicId}`);
      }
      const cloudinaryRes = await cloudinary.uploader.upload(profilePic, {
        folder: "Twine/users",
      });
      profilePic = cloudinaryRes.secure_url;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;

    user = await user.save();

    const resUserData = {
      _id: user._id,
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      profilePic: profilePic || user.profilePic,
      bio: bio || user.bio,
    };

    return res
      .status(200)
      .json({ message: "User profile updated", user: resUserData });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getUserProfile = async (req, res) => {
  const { query } = req.params;
  try {
    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
