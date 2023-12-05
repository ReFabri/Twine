import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "ALL IS WELL !" });
});

router.post("/signup", (req, res) => {
  res.send("Signed up successfully");
});

export default router;
