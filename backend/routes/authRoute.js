import express from "express";
const router = express.Router();
import {
  createUser,
  loginUser,
  validateSignup,
  validateLogin,
  getUserById,
  sendResetCode,
  verifyResetCode,
  resetPasswordWithCode,
  resendResetCode,
  getCaptcha,
} from "../controllers/authController.js";
import fetchuser from "../middleware/fetchUser.js";
import { checkRole } from "../middleware/checkRole.js";

// Signup Route
router.post("/createuser", validateSignup, createUser);
router.get("/captcha", getCaptcha);
// Login Route
router.post("/login", validateLogin, loginUser);

// Get user by ID (protected)
router.get("/users/:id", fetchuser, getUserById);

// Password reset routes
router.post("/send-reset-code", sendResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPasswordWithCode);
router.post("/resend-reset-code", resendResetCode);

// Role-protected routes
router.get(
  "/admin-dashboard",
  fetchuser,
  checkRole(["restaurant_owner"]),
  (req, res) => {
    res.json({ message: "Restaurant owner dashboard" });
  }
);

router.get(
  "/customer-profile",
  fetchuser,
  checkRole(["customer"]),
  (req, res) => {
    res.json({ message: "Customer profile" });
  }
);

export default router;
