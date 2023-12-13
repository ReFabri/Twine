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
router.get("/profile/:username", getUserProfile);
router.get("/follow/:id", protectRoute, followUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
