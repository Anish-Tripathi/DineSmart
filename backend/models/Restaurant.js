import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Promotion code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
      default: "percentage",
    },
    discountValue: {
      type: Number,
      required: true,
      min: [0, "Discount cannot be negative"],
      validate: {
        validator: function (value) {
          if (this.discountType === "percentage") {
            return value <= 100;
          }
          return true;
        },
        message: "Percentage discount cannot exceed 100%",
      },
    },
    minOrderAmount: {
      type: Number,
      min: 0,
      default: 0,
    },
    validFrom: {
      type: Date,
      required: true,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.validFrom;
        },
        message: "Valid until date must be after valid from date",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    tags: [String],
    deliveryTime: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    priceRange: {
      type: Number,
      required: true,
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    promotions: [promotionSchema],
    contactInfo: {
      phone: String,
      email: String,
      hours: [String],
      manager: String,
      emergencyContact: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create geospatial index for location-based queries
restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ owner: 1 }, { unique: true });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
