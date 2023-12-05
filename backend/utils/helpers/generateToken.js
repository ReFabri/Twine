import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    httpOnly: true, //Only backend can access cookie
    maxAge: 1000 * 60 * 60 * 24 * 15, //Expires in 15days
    sameSite: "strict", //Protect against CSRF attacks
  });

  return token;
};

export default generateToken;
