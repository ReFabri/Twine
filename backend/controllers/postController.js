import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/helpers/errorHandler.js";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res
        .status(400)
        .json({ message: "Text and User fields are required" });

    const user = await User.findById(postedBy);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (String(user._id) !== String(req.user._id))
      return res.status(401).json({ message: "Unauthorized" });

    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ message: `Post exceeds ${maxLength} characters` });

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
      return res.status(404).json({ message: "Post not found" });
    }

    if (String(post.postedBy) !== String(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized to delete post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    res.send("ROUTE TODO");
  } catch (error) {
    errorHandler(error, res);
  }
};

export const replyToPost = async (req, res) => {
  try {
    res.send("ROUTE TODO");
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    res.send("ROUTE TODO");
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    res.send("ROUTE TODO");
  } catch (error) {
    errorHandler(error, res);
  }
};
