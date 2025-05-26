import jwt from "jsonwebtoken";
import User from "../models/User.js";

const fetchuser = async (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = await User.findById(data.user.id).select("-password");
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchuser;
