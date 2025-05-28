import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongodb from "./config/db.js";
import authRoute from "./routes/authRoute.js";

import session from "express-session";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 10000;

// Connect to MongoDB
mongodb();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api", orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("DineSmart API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
