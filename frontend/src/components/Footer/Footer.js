import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
      setUserRole(localStorage.getItem("userRole") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Public links
  const publicLinks = [
    { to: "/", label: "Menu" },
    { to: "/about", label: "About Us" },
    { to: "/features", label: "Features" },
  ];

  // Customer links
  const customerLinks = [
    { to: "/booking-history", label: "My Bookings" },
    { to: "/myOrder", label: "My Orders" },
    { to: "/feedback", label: "Feedback" },
  ];

  // Restaurant owner links
  const ownerLinks = [
    { to: "/manage-order", label: " Orders" },
    { to: "/manage-booking", label: "Bookings" },
    { to: "/manage-restaurant", label: "Manage" },
  ];

  // Help & Support links (always visible)
  const helpLinks = [
    { to: "/contact-us", label: "Contact Us" },
    { to: "/faq", label: "FAQs" },
    { to: "/terms-conditions", label: "Terms & Services" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/features", label: "Customer Reviews" },
    { to: "/settings", label: "Settings" },
  ];

  // Decide which links to show in the Quick Links section
  let quickLinks = [...publicLinks];

  if (token && userRole === "customer")
    quickLinks = quickLinks.concat(customerLinks);
  if (token && userRole === "restaurant_owner")
    quickLinks = quickLinks.concat(ownerLinks);

  return (
    <footer className={styles.footer}>
      <div className={styles.footContainer}>
        <div className={styles.row}>
          <div className={styles.colLg3}>
            <h5 className={styles.footerHeading}>About Us</h5>
            <p className={styles.footerDescription}>
              Welcome to DineSmart, your go-to destination for delicious meals.
              Search for the best restaurants, explore menus tailored to your
              dietary preferences, and enjoy a seamless ordering experience.
              From comfort food to healthy bites—we’ve got you covered.
            </p>
            <div className={styles.socialIcons}>
              <a
                className={styles.socialIcon}
                href="https://www.linkedin.com/in/anish-t-223238270/"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className={styles.socialIcon}
                href="https://x.com/home?lang=en-in"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className={styles.socialIcon}
                href="https://www.instagram.com/?__pwa=1"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className={styles.colLg3}>
            <h5 className={styles.footerHeading}>Quick Links</h5>
            <ul className={styles.footerLinksName}>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.footerLinkName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colLg3}>
            <h5 className={styles.footerHeading}>Help & Support</h5>
            <ul className={styles.footerLinksName}>
              {helpLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.footerLinkName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.colLg3}>
            <h5 className={styles.footerHeading}>Contact Us</h5>
            <div className={styles.contactInfoFooter}>
              <div className={styles.contactItem}>
                <div className={styles.contactText}>
                  <p>
                    Shop no 69, Balaji Annexe area, Ramdev Park road, Mira Road
                    (East), Mumbai - 401107
                  </p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <div className={styles.contactText}>
                  <p>support@DineSmart.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footContainer}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} DineSmart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
