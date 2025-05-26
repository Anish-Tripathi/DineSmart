import express from "express";
import {
  fetchUserProfile,
  updateProfile,
  changePassword,
  updateNotifications,
  updatePrivacy,
} from "../controllers/userController.js";
import fetchuser from "../middleware/fetchUser.js";

import { check } from "express-validator";

const router = express.Router();

router.get("/", fetchuser, fetchUserProfile);

router.put(
  "/profile",
  fetchuser,
  [
    check("name", "Name must be at least 5 characters").isLength({ min: 5 }),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Please include a valid 10-digit phone number").isLength({
      min: 10,
      max: 10,
    }),
    check("address", "Address is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
  ],
  updateProfile
);

// Change password
router.put("/password", fetchuser, changePassword);

// Update notification preference
router.put("/notifications", fetchuser, updateNotifications);

// Update privacy setting
router.put("/privacy", fetchuser, updatePrivacy);

export default router;
