import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "THIS IS WORKING" });
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
