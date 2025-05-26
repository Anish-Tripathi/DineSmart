// Utility to calculate all order totals, including coupon and restaurant promotion

export default function calculateOrderTotals(
  orderItems,
  appliedCoupon,
  restaurantPromotion,
  gstRate = 5,
  deliveryChargeValue = 50
) {
  // Calculate items total
  const itemsPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

  // Coupon discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (itemsPrice * appliedCoupon.discount) / 100;
      if (
        appliedCoupon.maxDiscount &&
        discountAmount > appliedCoupon.maxDiscount
      ) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }

  // Subtotal after coupon
  let discountedSubtotal = itemsPrice - discountAmount;

  // Promotion discount
  let promoDiscountAmount = 0;
  if (restaurantPromotion) {
    if (
      !restaurantPromotion.minOrderAmount ||
      discountedSubtotal >= restaurantPromotion.minOrderAmount
    ) {
      if (restaurantPromotion.discountType === "percentage") {
        promoDiscountAmount =
          (discountedSubtotal * restaurantPromotion.discountValue) / 100;
      } else {
        promoDiscountAmount = restaurantPromotion.discountValue;
      }
    }
  }

  // Subtotal after coupon and promotion
  let subtotalAfterPromo = discountedSubtotal - promoDiscountAmount;

  // GST
  const taxPrice = (subtotalAfterPromo * gstRate) / 100;

  // Delivery
  const amountBeforeDelivery = subtotalAfterPromo + taxPrice;
  const deliveryThreshold = 500;
  let deliveryCharges =
    amountBeforeDelivery >= deliveryThreshold ? 0 : deliveryChargeValue;
  let isFreeDelivery = amountBeforeDelivery >= deliveryThreshold;
  let deliveryMessage = isFreeDelivery
    ? "Free delivery applied"
    : `Add ₹${(deliveryThreshold - amountBeforeDelivery).toFixed(
        2
      )} more for free delivery`;

  // Final total
  const totalAmount = amountBeforeDelivery + deliveryCharges;

  return {
    itemsPrice,
    discountAmount,
    promoDiscountAmount,
    taxPrice,
    deliveryCharges,
    isFreeDelivery,
    deliveryMessage,
    totalAmount,
  };
}
