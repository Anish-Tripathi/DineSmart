import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "restaurant_owner"],
    default: "customer",
    required: true,
  },

  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
  },
  privacySettings: {
    publicProfile: { type: Boolean, default: false },
    onlineStatus: { type: Boolean, default: true },
    dataCollection: { type: Boolean, default: true },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
