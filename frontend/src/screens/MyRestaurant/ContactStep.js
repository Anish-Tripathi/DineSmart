import React from "react";
import { Phone, Mail, User, AlertCircle, Clock } from "lucide-react";
import styles from "./AddRestaurant.module.css";

const ContactStep = ({ restaurant, setRestaurant, handleRestaurantChange }) => (
  <div className={styles.stepContainer}>
    <div className={styles.gridTwoColumns}>
      <div className={styles.formGroup}>
        <label className={styles.labelWithIcon}>
          <Phone size={16} className={styles.labelIcon} />
          Phone Number *
        </label>
        <input
          type="tel"
          name="contactInfo.phone"
          value={restaurant.contactInfo.phone}
          onChange={handleRestaurantChange}
          className={styles.input}
          placeholder="+1234567890"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelWithIcon}>
          <Mail size={16} className={styles.labelIcon} />
          Email *
        </label>
        <input
          type="email"
          name="contactInfo.email"
          value={restaurant.contactInfo.email}
          onChange={handleRestaurantChange}
          className={styles.input}
          placeholder="restaurant@example.com"
          required
        />
      </div>
    </div>

    <div className={styles.gridTwoColumns}>
      <div className={styles.formGroup}>
        <label className={styles.labelWithIcon}>
          <User size={16} className={styles.labelIcon} />
          Manager Name *
        </label>
        <input
          type="text"
          name="contactInfo.manager"
          value={restaurant.contactInfo.manager}
          onChange={handleRestaurantChange}
          className={styles.input}
          placeholder="Manager's full name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.labelWithIcon}>
          <AlertCircle size={16} className={styles.labelIcon} />
          Emergency Contact *
        </label>
        <input
          type="text"
          name="contactInfo.emergencyContact"
          value={restaurant.contactInfo.emergencyContact}
          onChange={handleRestaurantChange}
          className={styles.input}
          placeholder="Emergency contact number"
          required
        />
      </div>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.labelWithIcon}>
        <Clock size={16} className={styles.labelIcon} />
        Operating Hours
      </label>
      {restaurant.contactInfo.hours.map((hour, index) => (
        <div key={index} className={styles.hourInputGroup}>
          <input
            type="text"
            value={hour}
            onChange={(e) => {
              const newHours = [...restaurant.contactInfo.hours];
              newHours[index] = e.target.value;
              setRestaurant((prev) => ({
                ...prev,
                contactInfo: {
                  ...prev.contactInfo,
                  hours: newHours,
                },
              }));
            }}
            className={styles.input}
            placeholder="e.g., Mon-Fri: 9AM-10PM"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => {
                const newHours = [...restaurant.contactInfo.hours];
                newHours.splice(index, 1);
                setRestaurant((prev) => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    hours: newHours,
                  },
                }));
              }}
              className={styles.removeButton}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setRestaurant((prev) => ({
            ...prev,
            contactInfo: {
              ...prev.contactInfo,
              hours: [...prev.contactInfo.hours, ""],
            },
          }));
        }}
        className={styles.addButton}
      >
        Add Hours
      </button>
    </div>
  </div>
);

export default ContactStep;
