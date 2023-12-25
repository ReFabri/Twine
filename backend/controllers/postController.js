import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/helpers/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res
        .status(400)
        .json({ error: "Text and User fields are required" });

    const user = await User.findById(postedBy);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (String(user._id) !== String(req.user._id))
      return res.status(401).json({ error: "Unauthorized" });

    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ error: `Post exceeds ${maxLength} characters` });

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "Twine/posts",
      });
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (String(post.postedBy) !== String(req.user._id)) {
      return res.status(401).json({ error: "Unauthorized to delete post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`Twine/posts/${imgId}`);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { _id: userId } = req.user;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const isPostLiked = post.likes.includes(userId);

    if (isPostLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
    }

    return res.status(200).json({
      message: `Post ${isPostLiked ? "unliked" : "liked"} successfully`,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const replyToPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { _id: userId, profilePic: userProfilePic, username } = req.user;
    const { text } = req.body;

    if (!text?.trim())
      return res.status(400).json({ error: "Reply text is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();

    return res
      .status(200)
      .json({
        message: "Successfully replied to post",
        reply: post.replies[post.replies.length - 1],
      });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedPosts);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
  }
};
