import express from "express";
import {
  followUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/profile/:query", getUserProfile);
router.get("/follow/:id", protectRoute, followUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
