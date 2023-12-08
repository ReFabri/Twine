import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

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

router.post("/create", protectRoute, createPost);

export default router;
