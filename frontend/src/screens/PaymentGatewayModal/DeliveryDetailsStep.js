import React from "react";
import styles from "./PaymentGatewayModal.module.css";
import { MapPin, Tag } from "lucide-react";

export default function DeliveryDetailsStep({
  deliveryAddress,
  editAddress,
  addressRef,
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponError,
  availableCoupons,
  handleApplyCoupon,
  handleRemoveCoupon,
  handleEditAddress,
  handleSaveAddress,
  setEditAddress,
  totals,
  gstRate,
  handleNextStep,
  restaurantPromotions = [],
  restaurantPromotion,
  promotionError,
  handleApplyPromotion,
  handleRemovePromotion,
}) {
  return (
    <>
      <div className={styles.stepContainer}>
        <div className={styles.stepHeading}>
          <div className={styles.stepIcon}>
            <MapPin size={20} />
          </div>
          <h3>Delivery Details</h3>
        </div>

        <div className={styles.gatewaySection}>
          <div className={styles.gatewayLabel}>Delivery Address:</div>
          {editAddress ? (
            <div className={styles.editAddressForm}>
              <textarea
                ref={addressRef}
                defaultValue={deliveryAddress}
                className={styles.addressInput}
                placeholder="Enter your complete delivery address"
                rows={3}
              />
              <div className={styles.addressActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setEditAddress(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveAddressButton}
                  onClick={handleSaveAddress}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.addressDisplay}>
              <span>{deliveryAddress || "No address found"}</span>
              <button
                className={styles.editAddressButton}
                onClick={handleEditAddress}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Coupon section */}
        <div className={styles.gatewaySection}>
          <div className={styles.gatewayLabel}>Apply Coupon:</div>
          {appliedCoupon ? (
            <div className={styles.appliedCouponContainer}>
              <div className={styles.appliedCoupon}>
                <div className={styles.couponDetails}>
                  <span className={styles.couponCode}>
                    {appliedCoupon.code}
                  </span>
                  <span className={styles.couponDiscount}>
                    {appliedCoupon.type === "percent"
                      ? `${appliedCoupon.discount}% OFF`
                      : `₹${appliedCoupon.discount} OFF`}
                  </span>
                </div>
                <button
                  className={styles.removeCouponButton}
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.couponContainer}>
              <div className={styles.couponInputGroup}>
                <input
                  type="text"
                  className={styles.couponInput}
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  className={styles.applyCouponButton}
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <div className={styles.couponError}>{couponError}</div>
              )}
              <div className={styles.availableCoupons}>
                <span className={styles.availableCouponsTitle}>
                  Available Coupons:
                </span>
                <div className={styles.couponsList}>
                  {availableCoupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className={styles.couponItem}
                      onClick={() => setCouponCode(coupon.code)}
                    >
                      <div className={styles.couponCode}>
                        <Tag size={16} /> {coupon.code}
                      </div>

                      <div className={styles.minOrder}>
                        Min. Order: ₹{coupon.minOrder}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Promotions */}
        {restaurantPromotions.length > 0 && (
          <div className={styles.gatewaySection}>
            <div className={styles.gatewayLabel}>Restaurant Offers:</div>
            {restaurantPromotion ? (
              <div className={styles.appliedCouponContainer}>
                <div className={styles.appliedCoupon}>
                  <div className={styles.couponDetails}>
                    <span className={styles.couponCode}>
                      {restaurantPromotion.code}
                    </span>
                    <span className={styles.couponDiscount}>
                      {restaurantPromotion.discountType === "percentage"
                        ? `${restaurantPromotion.discountValue}% OFF`
                        : `₹${restaurantPromotion.discountValue} OFF`}
                    </span>
                  </div>
                  <button
                    className={styles.removeCouponButton}
                    onClick={handleRemovePromotion}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.couponsList}>
                {restaurantPromotions.map((promo) => (
                  <div
                    key={promo.code}
                    className={styles.couponItem}
                    onClick={() => handleApplyPromotion(promo.code)}
                  >
                    <div className={styles.couponCode}>
                      <Tag size={16} /> {promo.code}
                    </div>
                    <div className={styles.couponDescription}>
                      {promo.discountType === "percentage"
                        ? `${promo.discountValue}% off`
                        : `Flat ₹${promo.discountValue} off`}
                    </div>

                    <div className={styles.minOrder}>
                      Min. Order: ₹{promo.minOrderAmount}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {promotionError && (
              <div className={styles.couponError}>{promotionError}</div>
            )}
          </div>
        )}
      </div>

      {/* Bill Summary */}
      <div className={styles.billSummary}>
        <h4>Order Summary</h4>
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
            Restaurant Offer: <span>-₹{totals.promoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className={styles.summaryLine}>
          GST ({gstRate}%): <span>₹{totals.gstAmount.toFixed(2)}</span>
        </div>
        <div className={styles.summaryLine}>
          Delivery Fee: <span>₹{totals.deliveryCharges.toFixed(2)}</span>
        </div>
        <div
          className={`${styles.deliveryMessage} ${
            totals.deliveryCharges === 0 ? styles.positive : styles.encourage
          }`}
        >
          {totals.deliveryMessage}
          {totals.deliveryCharges > 0 && (
            <span className={styles.freeDeliveryInfo}>
              (Free delivery on orders above ₹500)
            </span>
          )}
        </div>
        <div className={styles.summaryTotal}>
          Total: <span>₹{totals.finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.stepActions}>
        <button
          className={styles.primaryButton}
          onClick={handleNextStep}
          disabled={!deliveryAddress}
        >
          Continue to Payment
        </button>
      </div>
    </>
  );
}
