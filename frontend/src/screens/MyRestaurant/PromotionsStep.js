import React from "react";
import styles from "./AddRestaurant.module.css";

const PromotionsStep = ({
  restaurant,
  newPromotion,
  handlePromotionChange,
  handleAddPromotion,
  handleRemovePromotion,
}) => (
  <div className={styles.stepContainer}>
    <div className={styles.promotionCard}>
      <h3 className={styles.cardTitle}>Add New Promotion</h3>
      <div className={styles.gridTwoColumns}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Promotion Code</label>
          <input
            type="text"
            name="code"
            value={newPromotion.code}
            onChange={handlePromotionChange}
            className={styles.input}
            placeholder="e.g., WELCOME20"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={newPromotion.description}
            onChange={handlePromotionChange}
            className={styles.input}
            placeholder="e.g., Welcome discount for new customers"
          />
        </div>
      </div>
      <div className={styles.gridThreeColumns}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Discount Type</label>
          <select
            name="discountType"
            value={newPromotion.discountType}
            onChange={handlePromotionChange}
            className={styles.select}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {newPromotion.discountType === "percentage"
              ? "Percentage Off"
              : "Amount Off"}
          </label>
          <input
            type="number"
            name="discountValue"
            value={newPromotion.discountValue}
            onChange={handlePromotionChange}
            className={styles.input}
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Minimum Order Amount</label>
          <input
            type="number"
            name="minOrderAmount"
            value={newPromotion.minOrderAmount}
            onChange={handlePromotionChange}
            className={styles.input}
            min="0"
          />
        </div>
      </div>
      <div className={styles.gridTwoColumns}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Valid From</label>
          <input
            type="date"
            name="validFrom"
            value={newPromotion.validFrom}
            onChange={handlePromotionChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Valid Until</label>
          <input
            type="date"
            name="validUntil"
            value={newPromotion.validUntil}
            onChange={handlePromotionChange}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.promotionFooter}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isActive"
            checked={newPromotion.isActive}
            onChange={handlePromotionChange}
            className={styles.checkbox}
          />
          Active Promotion
        </label>
        <button
          type="button"
          onClick={handleAddPromotion}
          className={styles.addPromotionButton}
        >
          Add Promotion
        </button>
      </div>
    </div>
    {/* Display added promotions */}
    {restaurant.promotions.length > 0 && (
      <div>
        <h3 className={styles.cardTitle}>Current Promotions</h3>
        <div className={styles.promotionsList}>
          {restaurant.promotions.map((promo, index) => (
            <div key={index} className={styles.promotionItem}>
              <div>
                <div className={styles.promoCode}>{promo.code}</div>
                <div className={styles.promoDescription}>
                  {promo.description}
                </div>
                <div className={styles.promoDetails}>
                  {promo.discountType === "percentage"
                    ? `${promo.discountValue}% off`
                    : `₹${promo.discountValue} off`}
                  {promo.minOrderAmount > 0 &&
                    ` (min order ₹${promo.minOrderAmount})`}
                </div>
                <div className={styles.promoDates}>
                  Valid: {new Date(promo.validFrom).toLocaleDateString()} -{" "}
                  {new Date(promo.validUntil).toLocaleDateString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemovePromotion(index)}
                className={styles.removePromotionButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default PromotionsStep;
