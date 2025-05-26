import { useState } from "react";
import React from "react";
import { Award, Home } from "lucide-react";
import styles from "./TermsAndConditions.module.css";
import { sections } from "./Sections.js";

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <>
      <div className={styles.termsContainer}>
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.termsHeader}>
          <Award className={styles.logoIcon} size={36} />
          <h1>Terms & Conditions</h1>
        </div>

        <div className={styles.introPanel}>
          <div className={styles.introContent}>
            <h2>Welcome to DineSmart</h2>
            <p className={styles.introText}>
              By accessing and using our services, you agree to comply with the
              following terms and conditions. Please read these terms carefully
              before using our platform.
            </p>
          </div>
        </div>

        <div className={styles.termsMain}>
          <div className={styles.navigationSidebar}>
            <div className={styles.navHeader}>
              <Home size={20} />
              <span>Contents</span>
            </div>
            <ul className={styles.navLinks}>
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={
                    activeSection === section.id ? styles.navLinkActive : ""
                  }
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.termsContent}>
            {sections.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className={`${styles.termsSection} ${
                  activeSection === section.id ? styles.termsSectionActive : ""
                }`}
              >
                <div className={styles.sectionHeader}>
                  {section.icon}
                  <h2>{section.title}</h2>
                </div>
                <div className={styles.sectionDivider}></div>
                <p>{section.content}</p>
              </div>
            ))}
            <div className={styles.termsFooter}>
              <div className={styles.lastUpdated}>
                Last Updated: April 24, 2025
              </div>
              <div className={styles.thankYou}>
                Thank you for choosing DineSmart
              </div>
              <div className={styles.footerLinks}>
                <a href="/privacy-policy">Privacy Policy</a>
                <span className={styles.dividerDot}>•</span>
                <a href="/contact-us">Contact Us</a>
                <span className={styles.dividerDot}>•</span>
                <a href="/faq">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
