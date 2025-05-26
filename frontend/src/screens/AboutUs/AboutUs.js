import React from "react";
import {
  ArrowRight,
  Users,
  MapPin,
  Star,
  Utensils,
  ChefHat,
  Leaf,
  Heart,
  Clock,
  ShieldCheck,
  Truck,
  Smartphone,
  Gift,
  BadgePercent,
} from "lucide-react";
import styles from "./About.module.css";

export default function AboutUs() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>Want to Know About Us?</h1>
            <p className={styles.subtitle}>
              Discover why millions choose DineSmart for their food adventures
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.backgroundOverlay}></div>
        {/* Mission Section */}
        <div className={styles.missionContainer}>
          <h2>Our Mission</h2>
          <p className={styles.missionText}>
            At DineSmart, we aim to revolutionize the way people discover and
            enjoy their meals. Whether you're booking a table or exploring new
            dishes, our platform makes dining seamless, smart, and satisfying.
            We connect food lovers with exceptional culinary experiences while
            supporting sustainable dining practices.
          </p>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <Users className={styles.statIcon} size={28} />
              <div className={styles.statNumber}>5000+</div>
              <div className={styles.statLabel}>Happy Customers</div>
            </div>
            <div className={styles.statCard}>
              <Utensils className={styles.statIcon} size={28} />
              <div className={styles.statNumber}>120+</div>
              <div className={styles.statLabel}>Partner Restaurants</div>
            </div>
            <div className={styles.statCard}>
              <MapPin className={styles.statIcon} size={28} />
              <div className={styles.statNumber}>35+</div>
              <div className={styles.statLabel}>Cities Covered</div>
            </div>
            <div className={styles.statCard}>
              <Star className={styles.statIcon} size={28} />
              <div className={styles.statNumber}>4.8</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <h2>Why Choose DineSmart?</h2>
          <p className={styles.featuresSubtitle}>
            Discover what makes us different
          </p>

          <div className={styles.featuresGrid}>
            {/* Row 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Clock className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Quick & Easy Booking</h3>
                <p>
                  Reserve tables or order food in just a few taps with our
                  intuitive interface
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <ChefHat className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Chef-Curated Menus</h3>
                <p>
                  Exclusive dishes crafted by award-winning chefs in your city
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Leaf className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Sustainable Dining</h3>
                <p>
                  Eco-friendly restaurants and carbon-neutral delivery options
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <ShieldCheck className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Verified Reviews</h3>
                <p>Real feedback from our community of food enthusiasts</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Truck className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Fast Delivery</h3>
                <p>Get your favorite meals delivered in under 30 minutes</p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Smartphone className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Mobile Convenience</h3>
                <p>Full-featured app with exclusive mobile-only deals</p>
              </div>
            </div>

            {/* Row 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Gift className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Loyalty Rewards</h3>
                <p>
                  Earn points with every order redeemable for special treats
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <Heart className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Personalized Recommendations</h3>
                <p>AI-powered suggestions based on your taste preferences</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                <BadgePercent className={styles.featureIcon} size={24} />
              </div>
              <div className={styles.featureContent}>
                <h3>Exclusive Deals</h3>
                <p>
                  Enjoy special discounts and offers available only through our
                  platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2>Ready to Experience Smart Dining?</h2>
          <a href="/" className={styles.ctaButton}>
            Explore Our Menu
            <ArrowRight className={styles.buttonIcon} size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
