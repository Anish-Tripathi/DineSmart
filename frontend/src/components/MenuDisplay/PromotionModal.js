import styles from "./PromotionModal.module.css";
import {
  FaGift,
  FaPercent,
  FaRupeeSign,
  FaBolt,
  FaCalendarAlt,
} from "react-icons/fa";

const PromotionModal = ({ promotions, onClose }) => {
  if (!promotions || promotions.length === 0) return null;

  // Helper for discount display
  const getDiscountText = (promo) =>
    promo.discountType === "percentage" ? (
      <>
        <FaPercent className={styles.detailIcon} />
        {promo.discountValue}% OFF
      </>
    ) : (
      <>
        <FaRupeeSign className={styles.detailIcon} />
        {promo.discountValue} OFF
      </>
    );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.promotionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <FaGift className={styles.modalIcon} />
            <h3>Active Offers</h3>
          </div>
          <button className={styles.closeModalButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.promotionList}>
          {promotions.map((promo, idx) => (
            <div key={promo._id || idx} className={styles.promotionCard}>
              <div className={styles.promotionHeader}>
                <FaBolt className={styles.promotionIcon} />
                {getDiscountText(promo)}
                <span className={styles.promotionCode}>{promo.code}</span>
              </div>
              <div className={styles.promotionDescription}>
                {promo.description}
              </div>
              <div className={styles.promotionDetails}>
                <div className={styles.detailItem}>
                  <FaCalendarAlt />
                  <span>
                    Valid:{" "}
                    <b>{new Date(promo.validFrom).toLocaleDateString()}</b> -{" "}
                    <b>{new Date(promo.validUntil).toLocaleDateString()}</b>
                  </span>
                </div>
                {promo.minOrderAmount && (
                  <div className={styles.detailItem}>
                    • Min Order: <b>₹{promo.minOrderAmount}</b>
                  </div>
                )}
                {promo.isActive ? (
                  <div className={`${styles.detailItem} ${styles.activeBadge}`}>
                    <FaBolt />
                    Active
                  </div>
                ) : (
                  <div className={styles.inactiveBadge}>Inactive</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
