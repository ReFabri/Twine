import express from "express";
import {
  followUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/follow/:id", protectRoute, followUser);
router.post("/update/:id", protectRoute, updateUser);
router.get("/profile/:id", getUserProfile);

export default router;
