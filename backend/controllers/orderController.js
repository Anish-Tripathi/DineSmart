import Order from "../models/Order.js";
import calculateOrderTotals from "../utils/calculateOrderTotals.js";

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      order_data,
      email,
      restaurantId,
      deliveryAddress,
      paymentMethod,
      appliedCoupon,
      restaurantPromotion,
      gstRate = 5,
    } = req.body;

    if (
      !order_data ||
      !email ||
      !restaurantId ||
      !deliveryAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        required: [
          "order_data",
          "email",
          "restaurantId",
          "deliveryAddress",
          "paymentMethod",
        ],
      });
    }

    // Calculate all totals
    const totals = calculateOrderTotals(
      order_data,
      appliedCoupon,
      restaurantPromotion,
      gstRate
    );

    // Prepare order items with itemTotal
    const orderItems = order_data.map((item) => ({
      ...item,
      itemTotal: item.price * item.qty,
    }));

    // Create the order
    const order = new Order({
      userEmail: email,
      restaurantId,
      orderItems,
      deliveryAddress,
      paymentMethod,
      appliedCoupon: appliedCoupon
        ? {
            ...appliedCoupon,
            discountAmount: totals.discountAmount,
          }
        : null,
      restaurantPromotion: restaurantPromotion
        ? {
            ...restaurantPromotion,
            promoDiscountAmount: totals.promoDiscountAmount,
          }
        : null,
      gstRate,
      itemsPrice: totals.itemsPrice,
      discountAmount: totals.discountAmount,
      promoDiscountAmount: totals.promoDiscountAmount,
      taxPrice: totals.taxPrice,
      deliveryCharges: totals.deliveryCharges,
      isFreeDelivery: totals.isFreeDelivery,
      deliveryMessage: totals.deliveryMessage,
      totalAmount: totals.totalAmount,
      status: "preparing",
      estimatedTime: `${30 + Math.floor(Math.random() * 15)}`,
    });

    const createdOrder = await order.save();

    res.status(201).json({
      orderId: createdOrder._id,
      transactionId: `TXN${Date.now()}`,
      estimatedTime: createdOrder.estimatedTime,
      totalAmount: createdOrder.totalAmount,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
      ...(error.name === "ValidationError" && {
        validationErrors: error.errors,
      }),
    });
  }
};

// Get orders for a restaurant
const getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ userEmail: email })
      .sort({ createdAt: -1 })
      .populate("restaurantId", "name image");

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      restaurant: {
        _id: order.restaurantId?._id || null,
        name: order.restaurantId?.name || "Unknown Restaurant",
        image: order.restaurantId?.image || "/default-restaurant.jpg",
      },
      items: order.orderItems,
      totalAmount: order.totalAmount,
      status: order.status,
      estimatedTime: order.estimatedTime,
      orderDate: order.createdAt,
      deliveryAddress: order.deliveryAddress,
      paymentMethod: order.paymentMethod,
      transactionId:
        order.transactionId || `TXN${order._id.toString().slice(-8)}`,
      itemsPrice: order.itemsPrice,
      taxPrice: order.taxPrice,
      gstRate: order.gstRate,
      discountAmount: order.discountAmount,
      deliveryCharges: order.deliveryCharges,
      isFreeDelivery: order.isFreeDelivery,
      deliveryMessage: order.deliveryMessage,
      appliedCoupon: order.appliedCoupon
        ? {
            code: order.appliedCoupon.code,
            discount: order.appliedCoupon.discount,
            type: order.appliedCoupon.type,
            discountAmount:
              order.appliedCoupon.discountAmount || order.discountAmount,
          }
        : null,
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};

export { createOrder, getRestaurantOrders, updateOrderStatus, getUserOrders };
