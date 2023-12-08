import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/helpers/errorHandler.js";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res.status(400).json({ message: "Unable to create Post" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (String(user._id) !== String(req.user._id))
      return res.status(401).json({ message: "Unauthorized" });

    const maxLength = 500;
    if (text.length < maxLength)
      return res
        .status(400)
        .json({ message: `Post exceeds ${maxLength} characters` });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getPost = async (req, res) => {
  try {
    res.send("ROUTE TODO");
  } catch (error) {
    errorHandler(error, res);
  }
};

export const deletePost = async (req, res) => {
  try {
    res.send("ROUTE TODO");
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
