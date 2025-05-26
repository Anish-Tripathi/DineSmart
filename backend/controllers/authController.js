import nodemailer from "nodemailer";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import svgCaptcha from "svg-captcha";
import axios from "axios";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Store reset codes in memory
const resetCodes = new Map();

// Generate a 6-digit random code
const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send reset code to email
export const sendResetCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate and store reset code
    const code = generateResetCode();
    resetCodes.set(email, {
      code,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
    });

    // Send email with reset code
    const mailOptions = {
      from: '"DineSmart" <no-reply@dinesmart.com>',
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}\nThis code will expire in 15 minutes.\nIf you did not request a password reset, please ignore this email or contact our support team.`,
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Password Reset Request</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">
          You requested a password reset for your account.<br>
          Please use the following verification code to proceed:
        </p>
        <div style="background-color: #f5f5f5; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0; font-size: 24px; font-weight: bold; color: #4CAF50; text-align: center;">
          ${code}
        </div>
        <p style="font-size: 14px; color: #666666; margin-bottom: 25px;">
          <strong>Note:</strong> This code will expire in <b>15 minutes</b>. Please do not share this code with anyone for your account's security.
        </p>
        <div style="background: #eafbe7; padding: 15px; border-radius: 6px; margin-bottom: 20px; color: #2e7d32; font-size: 14px;">
          <b>Need Help?</b> If you didn't request this or need assistance, please contact our support team at 
          <a href="mailto:support@dinesmart.com" style="color: #1a5d1a; text-decoration: underline;">support@dinesmart.com</a>.
        </div>
       
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e0e0e0;">
        <p style="margin: 5px 0;">If you did not request this password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p style="margin: 10px 0 5px 0;">Stay Secure,<br><b>DineSmart Team</b></p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} DineSmart. All rights reserved.</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Reset code sent to email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Verify reset code
export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Check if code exists and is valid
    const storedCode = resetCodes.get(email);
    if (!storedCode || storedCode.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    if (Date.now() > storedCode.expiresAt) {
      resetCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Reset code has expired",
      });
    }

    res.json({
      success: true,
      message: "Code verified successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Reset password with verified code
export const resetPasswordWithCode = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    // Verify code again
    const storedCode = resetCodes.get(email);
    if (!storedCode || storedCode.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    if (Date.now() > storedCode.expiresAt) {
      resetCodes.delete(email);
      return res.status(400).json({
        success: false,
        message: "Reset code has expired",
      });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Remove used code
    resetCodes.delete(email);

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Resend reset code
export const resendResetCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate new code
    const code = generateResetCode();
    resetCodes.set(email, {
      code,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
    });

    // Send email with new code
    const mailOptions = {
      from: '"Your App Name" <no-reply@yourapp.com>',
      to: email,
      subject: "New Password Reset Code",
      text: `Your new password reset code is: ${code}\nThis code will expire in 15 minutes.`,
      html: `
        <div>
          <h2>New Password Reset Code</h2>
          <p>Your new password reset code is:</p>
          <h3>${code}</h3>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "New reset code sent to email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#f4f4f4",
  });
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200).send(captcha.data);
};

// Validation rules for signup
export const validateSignup = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be a 10-digit number"),
  body("address").notEmpty().withMessage("Address is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

// Validation rules for login with CAPTCHA
export const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("captcha")
    .notEmpty()
    .withMessage("Please enter the CAPTCHA shown in the image"),
];

// Signup controller
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      email,
      phone,
      address,
      location,
      password,
      role,
      restaurantName,
    } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // For restaurant owners, create restaurant first

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      phone,
      address,
      location,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Generate token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      authToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, rememberMe, captcha } = req.body;

  // Verify classic CAPTCHA
  if (
    !req.session.captcha ||
    captcha.toLowerCase() !== req.session.captcha.toLowerCase()
  ) {
    return res.status(400).json({
      success: false,
      message: "Incorrect CAPTCHA. Please try again.",
    });
  }
  req.session.captcha = null; // Clear after checking

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "1d",
    });

    // Include role in response
    res.json({
      success: true,
      authToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get user by ID controller
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
