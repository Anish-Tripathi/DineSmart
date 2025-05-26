import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, min: 1 },
        size: { type: String },
        price: { type: Number, required: true, min: 0 },
        img: { type: String },
        itemTotal: { type: Number, required: true, min: 0 },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["card", "upi", "cod"],
    },
    appliedCoupon: {
      code: String,
      discount: Number,
      type: {
        type: String,
        enum: ["percent", "fixed", "flat"],
      },
      maxDiscount: Number,
      minOrder: Number,
      discountAmount: Number, // Actual discount applied
    },
    // Restaurant Promotion
    restaurantPromotion: {
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "fixed"],
      },
      discountValue: Number,
      minOrderAmount: Number,
      description: String,
      promoDiscountAmount: Number, // Actual promotion discount applied
    },
    // Pricing breakdown
    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    promoDiscountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    gstRate: {
      type: Number,
      default: 5,
      min: 0,
      max: 100,
    },
    taxPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryCharges: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryThreshold: {
      type: Number,
      default: 500,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    estimatedTime: String,
    transactionId: String,
    // Additional metadata
    isFreeDelivery: {
      type: Boolean,
      default: false,
    },
    deliveryMessage: String,
  },
  { timestamps: true }
);

orderSchema.index({ userEmail: 1, createdAt: -1 });
orderSchema.index({ restaurantId: 1, status: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
