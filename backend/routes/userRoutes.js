import express from "express";
import {
  followUser,
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
router.post("/update", protectRoute, updateUser);

export default router;
