import express from "express";
import {
  followUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", followUser);

export default router;
