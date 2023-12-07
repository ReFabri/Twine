import bcrypt from "bcryptjs";
import generateToken from "../utils/helpers/generateToken.js";
import errorHandler from "../utils/helpers/errorHandler.js";
import User from "../models/userModel.js";

export const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
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
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
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
      return res.status(400).json({ message: "Invalid username or password" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
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
      return res.status(400).json({ message: "Unable to follow own user" });
    if (!userToFollow || !currentUser)
      return res.status(400).json({ message: "User not found" });
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
    const { name, username, email, password, profilePic, bio } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    if (id !== String(userId))
      return res.status(401).json({ message: "Unauthorized" });

    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    return res.status(200).json({ message: "User profile updated", user });
  } catch (error) {
    errorHandler(error, res);
  }
};
