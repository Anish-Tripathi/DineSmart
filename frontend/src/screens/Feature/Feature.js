import React from "react";
import styles from "./Feature.module.css";
import {
  FaUtensils,
  FaClock,
  FaWallet,
  FaStar,
  FaMobileAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaPercent,
  FaShieldAlt,
  FaHeadset,
  FaClipboardList,
  FaBell,
  FaFilter,
  FaChartBar,
  FaEdit,
  FaHistory,
  FaGift,
  FaPlusCircle,
  FaTable,
  FaListAlt,
  FaSyncAlt,
} from "react-icons/fa";

function Feature() {
  const role = localStorage.getItem("userRole");
  return (
    <>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {role === "restaurant_owner"
              ? "Grow Your Restaurant with DineSmart"
              : "Elevate Your Dining Experience"}
          </h1>
          <p className={styles.heroSubtitle}>
            {role === "restaurant_owner"
              ? "Smart tools to manage, analyze, and boost your restaurant business"
              : "Discover why millions choose DineSmart for their food adventures"}
          </p>
        </div>
      </div>

      {/* Main Features Section */}
      <div className={styles.featuresContainer}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {role === "restaurant_owner"
              ? "Why List Your Restaurant on DineSmart?"
              : "Why Choose DineSmart?"}
          </h2>
          <p className={styles.sectionDescription}>
            {role === "restaurant_owner"
              ? "Smart, flexible, and powerful management features for restaurant_owners"
              : "Making your dining experience smarter, faster, and better."}
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {role === "customer" && (
            <>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaUtensils className={styles.featureIcon} />
                </div>
                <h3>Smart Restaurant Search</h3>
                <p>
                  Find restaurants based on price range, current location,
                  ratings, dishes, or restaurant name. Enjoy intelligent
                  recommendations that fit your taste and budget.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaFilter className={styles.featureIcon} />
                </div>
                <h3>Menu Filter by Nutrition</h3>
                <p>
                  Filter restaurant menus by nutrition info or dish name. Easily
                  find meals that match your dietary needs.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaTable className={styles.featureIcon} />
                </div>
                <h3>Flexible Table Booking</h3>
                <p>
                  Book tables with your preferred date, guest count, and
                  details. Unlock offers for different time slots.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaClock className={styles.featureIcon} />
                </div>
                <h3>Order Tracking & History</h3>
                <p>
                  Track your order with real-time estimated delivery. View your
                  recent orders in an interactive order history.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaGift className={styles.featureIcon} />
                </div>
                <h3>Coupons & Promotions</h3>
                <p>
                  Get access to personalized coupons and promotional offers from
                  restaurants to save more on every order.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaWallet className={styles.featureIcon} />
                </div>
                <h3>Multiple Payment Options</h3>
                <p>
                  Pay with cards, wallets, UPI, or cash. Save your preferences
                  for a seamless checkout every time.
                </p>
              </div>
            </>
          )}

          {role === "restaurant_owner" && (
            <>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaPlusCircle className={styles.featureIcon} />
                </div>
                <h3>Add & Update Restaurant</h3>
                <p>
                  Easily list your restaurant with detailed information, update
                  details anytime as your business grows.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaListAlt className={styles.featureIcon} />
                </div>
                <h3>Manage Menu</h3>
                <p>
                  Add, edit, or delete menu items with nutrition details. Keep
                  your offerings fresh and relevant.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaTable className={styles.featureIcon} />
                </div>
                <h3>Manage Bookings</h3>
                <p>
                  View and update table bookings. Offer flexible booking slots
                  and manage guest details with ease.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaSyncAlt className={styles.featureIcon} />
                </div>
                <h3>Manage Orders</h3>
                <p>
                  Track incoming orders, update their status, and ensure timely
                  delivery for customer satisfaction.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaChartBar className={styles.featureIcon} />
                </div>
                <h3>Dashboard & Analytics</h3>
                <p>
                  Access analytics for ratings, revenue, and order trends to
                  make data-driven business decisions.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>
                  <FaPercent className={styles.featureIcon} />
                </div>
                <h3>Promotion & Offers</h3>
                <p>
                  Run promotional offers and coupons to attract new customers
                  and boost repeat orders.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className={styles.advancedFeatures}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Advanced Features</h2>
          <p className={styles.sectionDescription}>
            {role === "restaurant_owner"
              ? "Powerful tools to manage every aspect of your restaurant business"
              : "Discover the tools that make DineSmart stand out from the crowd"}
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {role === "customer" && (
            <>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaMapMarkerAlt className={styles.featureIcon} />
                </div>
                <h3>Smart Location Services</h3>
                <p>
                  Find restaurants near you or any selected location. Save
                  frequent addresses for quick ordering.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaStar className={styles.featureIcon} />
                </div>
                <h3>Verified Reviews</h3>
                <p>
                  Read reviews from real diners to make informed decisions
                  before you order or book a table.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaShieldAlt className={styles.featureIcon} />
                </div>
                <h3>Secure Transactions</h3>
                <p>
                  Enjoy peace of mind with industry-leading security for all
                  your payments and personal information.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaHeadset className={styles.featureIcon} />
                </div>
                <h3>24/7 Customer Support</h3>
                <p>
                  Get instant help any time via chat, call, or email from our
                  dedicated support team.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaBell className={styles.featureIcon} />
                </div>
                <h3>Smart Notifications</h3>
                <p>
                  Receive timely updates about orders, deals, offers, and
                  personalized recommendations.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaClipboardList className={styles.featureIcon} />
                </div>
                <h3>Dietary Preferences</h3>
                <p>
                  Filter options by vegetarian, vegan, gluten-free, and
                  allergies to match your needs.
                </p>
              </div>
            </>
          )}
          {role === "restaurant_owner" && (
            <>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaEdit className={styles.featureIcon} />
                </div>
                <h3>Edit Anytime</h3>
                <p>
                  Update your restaurant’s details, menu, and offers in real
                  time for complete control.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaHistory className={styles.featureIcon} />
                </div>
                <h3>Order & Booking History</h3>
                <p>
                  Access detailed history for orders and bookings to optimize
                  your service and offerings.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaUsers className={styles.featureIcon} />
                </div>
                <h3>Customer Insights</h3>
                <p>
                  Learn about your customers’ preferences, reviews, and order
                  patterns to personalize your service.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaMobileAlt className={styles.featureIcon} />
                </div>
                <h3>Responsive Management</h3>
                <p>
                  Manage your restaurant from any device—desktop or mobile—for
                  maximum flexibility.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaHeadset className={styles.featureIcon} />
                </div>
                <h3>Priority Support</h3>
                <p>
                  Get fast, prioritized support from our restaurant partner team
                  any time you need help.
                </p>
              </div>
              <div className={`${styles.featureCard} ${styles.advancedCard}`}>
                <div className={styles.iconWrapper}>
                  <FaStar className={styles.featureIcon} />
                </div>
                <h3>Boost Ratings</h3>
                <p>
                  Tools to help you encourage reviews and manage your
                  restaurant’s reputation.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      {role === "customer" && (
        <div className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Users Say</h2>
            <p className={styles.sectionDescription}>
              Join thousands of satisfied diners who trust DineSmart
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>★★★★★</div>
              <p className={styles.testimonialText}>
                "DineSmart completely changed how I order food. The tracking
                feature is amazingly accurate!"
              </p>
              <p className={styles.testimonialAuthor}>- Tanvi</p>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>★★★★★</div>
              <p className={styles.testimonialText}>
                "I love how I can find new restaurants that match my dietary
                preferences. Game changer for a vegan like me."
              </p>
              <p className={styles.testimonialAuthor}>- Manish</p>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>★★★★★</div>
              <p className={styles.testimonialText}>
                "The personalized offers save me money every week. Best food app
                I've ever used!"
              </p>
              <p className={styles.testimonialAuthor}>- Karan</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Feature;
