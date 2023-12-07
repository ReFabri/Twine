import express from "express";

import {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPost);

export default router;
