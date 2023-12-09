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
router.get("/:id", getPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);
router.get("/feed", protectRoute, getFeedPosts);
router.get("/user/:username", getUserPosts);

export default router;
