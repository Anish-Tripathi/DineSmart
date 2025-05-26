import React from "react";
import styles from "./PaymentGatewayModal.module.css";
import { Check, ChevronLeft, Tag, Percent } from "lucide-react";

export default function OrderConfirmationStep({
  deliveryAddress,
  paymentMethod,
  cardDetails,
  upiId,
  cartData,
  totals,
  gstRate,
  appliedCoupon,
  restaurantPromotion,
  handleNextStep,
  handlePrevStep,
  isPaying,
}) {
  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.stepHeading}>
          <div className={styles.stepIcon}>
            <Check size={20} />
          </div>
          <h3>Order Confirmation</h3>
        </div>

        <div className={styles.confirmationContainer}>
          <div className={styles.confirmationSection}>
            <h4>Delivery Address</h4>
            <p>{deliveryAddress}</p>
          </div>

          <div className={styles.confirmationSection}>
            <h4>Payment Method</h4>
            {paymentMethod === "card" && (
              <p>Credit/Debit Card (xxxx {cardDetails.cardNumber.slice(-4)})</p>
            )}
            {paymentMethod === "upi" && <p>UPI ({upiId})</p>}
            {paymentMethod === "cod" && <p>Cash on Delivery</p>}
          </div>

          <div className={styles.confirmationSection}>
            <h4>Order Items</h4>
            <div className={styles.orderItems}>
              {cartData.map((item, idx) => (
                <div key={idx} className={styles.orderItem}>
                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemSize}>{item.size}</span>
                  </div>
                  <div className={styles.itemQuantity}>x{item.qty}</div>
                  <div className={styles.itemPrice}>
                    ₹{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {appliedCoupon && (
            <div className={styles.confirmationSection}>
              <h4>Applied Coupon</h4>
              <div className={styles.couponBadge}>
                <Tag size={16} /> {appliedCoupon.code}
                <span className={styles.couponDiscount}>
                  {appliedCoupon.type === "percent"
                    ? `${appliedCoupon.discount}% OFF`
                    : `₹${appliedCoupon.discount} OFF`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {restaurantPromotion && (
        <div className={styles.confirmationSection}>
          <h4>Restaurant Promotion</h4>
          <div className={styles.couponBadge}>
            <Percent size={16} /> {restaurantPromotion.code}
            <span className={styles.couponDiscount}>
              {restaurantPromotion.discountType === "percentage"
                ? `${restaurantPromotion.discountValue}% OFF`
                : `₹${restaurantPromotion.discountValue} OFF`}
            </span>
            <span className={styles.couponDesc}>
              {restaurantPromotion.description}
            </span>
          </div>
        </div>
      )}

      <div className={styles.billSummary}>
        <h4>Payment Summary</h4>
        <div className={styles.summaryLine}>
          Item Total: <span>₹{totals.subtotal.toFixed(2)}</span>
        </div>
        {appliedCoupon && (
          <div className={styles.summaryDiscount}>
            Discount: <span>-₹{totals.discountAmount.toFixed(2)}</span>
          </div>
        )}
        {restaurantPromotion && (
          <div className={styles.summaryDiscount}>
            Restaurant Promo: <span>-₹{totals.promoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className={styles.summaryLine}>
          GST ({gstRate}%): <span>₹{totals.gstAmount.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          Delivery Fee: <span>₹{totals.deliveryCharges.toFixed(2)}</span>
        </div>
        <div className={styles.summaryTotal}>
          Total: <span>₹{totals.finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.stepActions}>
        <button className={styles.backButton} onClick={handlePrevStep}>
          <ChevronLeft size={16} /> Back
        </button>
        <button
          className={styles.payNowButton}
          onClick={handleNextStep}
          disabled={isPaying}
        >
          {isPaying ? "Processing..." : "Confirm & Pay"}
        </button>
      </div>
    </>
  );
}
