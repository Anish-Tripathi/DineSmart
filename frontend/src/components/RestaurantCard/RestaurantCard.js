import React from "react";
import styles from "./RestaurantCard.module.css";
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaLeaf,
  FaUtensils,
  FaPercent,
  FaRupeeSign,
  FaGift,
  FaBolt,
  FaMoneyBillWave,
  FaMedal,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PromotionHighlight({ promotions }) {
  if (!promotions || promotions.length === 0) return null;

  // Pick the most prominent promotion
  const promotion = promotions[0];
  const discount =
    promotion.discountType === "percentage" ? (
      <>
        <FaPercent style={{ marginRight: 4 }} />
        {promotion.discountValue}% OFF
      </>
    ) : (
      <>
        <FaRupeeSign style={{ marginRight: 4 }} />
        {promotion.discountValue} OFF
      </>
    );

  let icon = <FaGift />;
  let subtext = "Limited Time!";
  if (promotion.discountValue >= 50) {
    icon = <FaMoneyBillWave />;
    subtext = "Big Discount!";
  } else if (promotion.discountType === "percentage") {
    icon = <FaPercent />;
    subtext = "Exclusive Offer";
  } else if (promotions.length > 1) {
    icon = <FaPlus />;
    subtext = `+${promotions.length - 1} More Offers`;
  } else {
    icon = <FaBolt />;
  }

  return (
    <div className={styles.promotionHighlight}>
      <div className={styles.promotionHighlightLeft}>
        <span className={styles.promotionHighlightIcon}>{icon}</span>
      </div>
      <div className={styles.promotionHighlightContent}>
        <span className={styles.promotionHighlightDiscount}>{discount}</span>
        <span className={styles.promotionHighlightSub}>{subtext}</span>
      </div>
    </div>
  );
}

const RestaurantCard = ({ restaurant, onViewMenu }) => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    const restaurantId = restaurant.id || restaurant._id;
    if (restaurantId) {
      window.scrollTo(0, 0);
      navigate(`/menu/${restaurantId}`);
    } else {
      console.error("No restaurant ID found", restaurant);
    }
  };

  const handleBookTable = () => {
    if (restaurant?._id) {
      navigate(`/book-table/${restaurant._id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("Restaurant ID is missing");
    }
  };

  const getDisplayAddress = () => {
    if (restaurant.address) {
      if (typeof restaurant.address === "object") {
        const { street, city, zipCode } = restaurant.address;
        return [street, city, zipCode].filter(Boolean).join(", ");
      }
      return restaurant.address;
    }
    return restaurant.location || "Location not available";
  };

  const getActivePromotions = () => {
    if (!restaurant.promotions || restaurant.promotions.length === 0) {
      return [];
    }

    const now = new Date();
    return restaurant.promotions
      .filter(
        (promo) =>
          promo.isActive &&
          new Date(promo.validFrom) <= now &&
          new Date(promo.validUntil) >= now
      )
      .slice(0, 2);
  };

  const activePromotions = getActivePromotions();

  return (
    <div className={styles.restaurantCard}>
      <div className={styles.imageContainer}>
        <img
          src={restaurant.image || "/api/placeholder/300/200"}
          alt={restaurant.name}
          className={styles.restaurantImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/api/placeholder/300/200";
          }}
        />
        {restaurant.featured && (
          <div className={styles.featuredBadge}>
            <FaMedal className={styles.featuredIcon} />
            <span>Featured</span>
          </div>
        )}
        {activePromotions.length > 0 && (
          <div className={styles.promotionBadge}>
            <FaGift className={styles.promotionBadgeIcon} />
            <span>
              {activePromotions.length} Offer
              {activePromotions.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
        <div className={styles.ratingBadge}>
          <FaStar className={styles.ratingIcon} />
          <span className={styles.ratingText}>
            {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.restaurantName}>{restaurant.name}</h3>
          <div className={styles.tagContainer}>
            <span
              className={`${styles.tag} ${
                restaurant.isVeg ? styles.vegTag : styles.nonVegTag
              }`}
            >
              {restaurant.isVeg ? <FaLeaf /> : <FaUtensils />}
              {restaurant.isVeg ? "Veg" : "Non-Veg"}
            </span>
            <span className={styles.priceTag}>
              <FaRupeeSign /> {restaurant.priceRange || "₹₹ - ₹₹"}
            </span>
          </div>
        </div>

        <p className={styles.restaurantDescription}>
          {restaurant.description || "Delicious food awaits you!"}
        </p>

        {/* Promotion Highlight - prominent, green/white theme, icons not emoji */}
        {activePromotions.length > 0 && (
          <div className={styles.catchyPromotionContainer}>
            <PromotionHighlight promotions={activePromotions} />
          </div>
        )}

        <div className={styles.restaurantDetails}>
          <div className={styles.detailRow}>
            <FaMapMarkerAlt className={styles.detailIcon} />
            <span className={styles.detailText}>{getDisplayAddress()}</span>
          </div>

          <div className={styles.detailRow}>
            <FaClock className={styles.detailIcon} />
            <span className={styles.detailText}>
              {restaurant.deliveryTime || "30-45 mins"} delivery
            </span>
          </div>

          <div className={styles.cuisineContainer}>
            <span className={styles.cuisineLabel}>Cuisine:</span>
            <div className={styles.cuisineTags}>
              {restaurant.cuisine && (
                <span className={styles.cuisineTag}>{restaurant.cuisine}</span>
              )}
              {restaurant.tags &&
                restaurant.tags.length > 0 &&
                restaurant.tags.map((tag, index) => (
                  <span key={index} className={styles.cuisineTag}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <button
            className={styles.viewMenuButton}
            onClick={handleViewMenu}
            disabled={!restaurant?._id}
          >
            <FaUtensils style={{ marginRight: 6 }} /> View Menu
          </button>
          <button
            className={styles.bookTableButton}
            onClick={handleBookTable}
            disabled={!restaurant?._id}
          >
            <FaCheckCircle style={{ marginRight: 6 }} /> Book Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
