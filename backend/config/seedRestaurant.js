import mongoose from "mongoose";
import Restaurant from "../models/RestaurantModel.js";
import dotenv from "dotenv";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DineSmart");
    console.log("Connected to MongoDB");

    const restaurants = [
      {
        name: "Mumbai Street Food",
        description:
          "Authentic Mumbai street food flavors in a hygienic setting",
        address: "202 Chowpatty Lane, Westside",
        location: {
          type: "Point",
          coordinates: [72.8258, 18.975],
        },
        image: "https://example.com/mumbaistreet.jpg",
        cuisine: "Indian",
        tags: ["street food", "quick bites", "budget-friendly"],
        deliveryTime: 25,
        rating: 4.3,
        priceRange: "$",
        isVeg: false,
        featured: false,
        contactInfo: {
          phone: "555-2222",
          email: "hello@mumbaistreet.com",
          hours: ["10:00 AM - 12:00 AM", "Open 7 days"],
          manager: "Priya Desai",
          emergencyContact: "555-9222",
        },
      },
      {
        name: "Punjab Grill",
        description: "Hearty North Indian cuisine with robust flavors",
        address: "303 Tandoor Circle, North District",
        location: {
          type: "Point",
          coordinates: [77.1025, 28.7041],
        },
        image: "https://example.com/punjabgrill.jpg",
        cuisine: "Indian",
        tags: ["tandoori", "butter chicken", "naan"],
        deliveryTime: 38,
        rating: 4.6,
        priceRange: "$$$",
        isVeg: false,
        featured: true,
        contactInfo: {
          phone: "555-3333",
          email: "info@punjabgrill.com",
          hours: ["11:00 AM - 11:30 PM", "Open 7 days"],
          manager: "Harpreet Kaur",
          emergencyContact: "555-9333",
        },
      },
      {
        name: "Southern Spice",
        description: "Authentic South Indian vegetarian cuisine",
        address: "404 Dosa Plaza, Eastside",
        location: {
          type: "Point",
          coordinates: [80.2707, 13.0827], // Chennai coordinates
        },
        image: "https://example.com/southernspice.jpg",
        cuisine: "Indian",
        tags: ["vegetarian", "dosa", "idli", "sambar"],
        deliveryTime: 33, // Average of 25-40 mins
        rating: 4.4,
        priceRange: "$$",
        isVeg: true,
        featured: false,
        contactInfo: {
          phone: "555-4444",
          email: "contact@southernspice.com",
          hours: ["7:00 AM - 10:30 PM", "Closed on Wednesdays"],
          manager: "Arun Kumar",
          emergencyContact: "555-9444",
        },
      },
      {
        name: "Kolkata Kathi Roll",
        description: "Specializing in authentic Kolkata-style kathi rolls",
        address: "505 Roll Street, Central",
        location: {
          type: "Point",
          coordinates: [88.3639, 22.5726], // Kolkata coordinates
        },
        image: "https://example.com/kathiroll.jpg",
        cuisine: "Indian",
        tags: ["quick service", "rolls", "egg dishes"],
        deliveryTime: 20, // Average of 15-25 mins
        rating: 4.2,
        priceRange: "$",
        isVeg: false,
        featured: false,
        contactInfo: {
          phone: "555-5555",
          email: "orders@kathiroll.com",
          hours: ["9:00 AM - 1:00 AM", "Open 7 days"],
          manager: "Rahul Banerjee",
          emergencyContact: "555-9555",
        },
      },
      {
        name: "Gujarat Thali",
        description: "Unlimited Gujarati thali with traditional flavors",
        address: "606 Thali Road, Southside",
        location: {
          type: "Point",
          coordinates: [72.5714, 23.0225], // Ahmedabad coordinates
        },
        image: "https://example.com/gujaratthali.jpg",
        cuisine: "Indian",
        tags: ["thali", "vegetarian", "unlimited"],
        deliveryTime: 43, // Average of 35-50 mins
        rating: 4.5,
        priceRange: "$$",
        isVeg: true,
        featured: true,
        contactInfo: {
          phone: "555-6666",
          email: "thali@gujaratthali.com",
          hours: [
            "11:30 AM - 3:30 PM, 6:30 PM - 10:30 PM",
            "Closed on Mondays",
          ],
          manager: "Meena Patel",
          emergencyContact: "555-9666",
        },
      },
      {
        name: "Spicy Garden",
        description: "Authentic Indian Cuisine",
        address: "123 MG Road, Bengaluru",
        location: {
          type: "Point",
          coordinates: [77.5946, 12.9716], // [longitude, latitude]
        },
        image: "https://example.com/spicy-garden.jpg",
        cuisine: "Indian",
        tags: ["spicy", "veg", "family"],
        deliveryTime: 30,
        rating: 4.5,
        priceRange: "₹₹",
        isVeg: true,
        featured: true,
        contactInfo: {
          phone: "+91 9876543210",
          email: "info@spicygarden.in",
          hours: ["10am - 10pm"],
          manager: "Rajesh Kumar",
          emergencyContact: "+91 9123456789",
        },
      },
    ];

    await Restaurant.deleteMany({});
    await Restaurant.insertMany(restaurants);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
