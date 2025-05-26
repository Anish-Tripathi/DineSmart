import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./Signup.module.css";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    restaurantName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data);
        toast.success("User created successfully! You can now log in.");
        navigate("/login");
      } else {
        const errorMessages = data.errors
          ? data.errors.map((err) => err.msg).join(", ")
          : data.message
          ? data.message
          : "Failed to create user";
        throw new Error(errorMessages);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.backgroundOverlay}></div>
      <h2 className={styles.signupTitle}>Create Account</h2>
      <p className={styles.loginSubtitle}>
        Sign up and make every meal smarter!
      </p>
      <form id="signupForm" onSubmit={handleSubmit}>
        <div className={`${styles.formGroup} ${styles.roleGroup}`}>
          <i
            className={`fas fa-user-shield fa-lg ${styles.me3} ${styles.faFw}`}
          ></i>

          <div className={styles.roleSelection}>
            <label
              className={
                credentials.role === "customer" ? styles.roleActive : ""
              }
            >
              <input
                type="radio"
                name="role"
                value="customer"
                checked={credentials.role === "customer"}
                onChange={handleChange}
              />
              <span>Customer</span>
            </label>
            <label
              className={
                credentials.role === "restaurant_owner" ? styles.roleActive : ""
              }
            >
              <input
                type="radio"
                name="role"
                value="restaurant_owner"
                checked={credentials.role === "restaurant_owner"}
                onChange={handleChange}
              />
              <span>Restaurant Owner</span>
            </label>
          </div>
        </div>

        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i className={`fas fa-user fa-lg ${styles.me3} ${styles.faFw}`}></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="name" className={styles.signupLabel}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.formControl}
              required
              name="name"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email Field */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i
            className={`fas fa-envelope fa-lg ${styles.me3} ${styles.faFw}`}
          ></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="email" className={styles.signupLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.formControl}
              required
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="example@domain.com"
            />
          </div>
        </div>

        {/* Phone Field */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i className={`fas fa-phone fa-lg ${styles.me3} ${styles.faFw}`}></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="phone" className={styles.signupLabel}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={styles.formControl}
              required
              name="phone"
              value={credentials.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        {/* Address Field */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i
            className={`fas fa-map-marker-alt fa-lg ${styles.me3} ${styles.faFw}`}
          ></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="address" className={styles.signupLabel}>
              Address
            </label>
            <input
              type="text"
              id="address"
              className={styles.formControl}
              required
              name="address"
              value={credentials.address}
              onChange={handleChange}
              placeholder="Enter your full address"
            />
          </div>
        </div>

        {/* Location Field (could be city/area) */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i className={`fas fa-globe fa-lg ${styles.me3} ${styles.faFw}`}></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="location" className={styles.signupLabel}>
              Location (City/Area)
            </label>
            <input
              type="text"
              id="location"
              className={styles.formControl}
              required
              name="location"
              value={credentials.location}
              onChange={handleChange}
              placeholder="Enter your city or area"
            />
          </div>
        </div>

        {/* Password Field */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i className={`fas fa-lock fa-lg ${styles.me3} ${styles.faFw}`}></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="password" className={styles.signupLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.formControl}
              required
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Create a strong password"
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div
          className={`${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb3}`}
        >
          <i className={`fas fa-key fa-lg ${styles.me3} ${styles.faFw}`}></i>
          <div className={`${styles.formOutline} ${styles.mb0}`}>
            <label htmlFor="confirmPassword" className={styles.signupLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.formControl}
              required
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div
          className={`${styles.formCheck} ${styles.justifyContentCenter} ${styles.mb5}`}
        >
          <input
            className={`${styles.formCheckInput} ${styles.me2}`}
            type="checkbox"
            id="terms"
            required
          />
          <label className={styles.formCheckLabel} htmlFor="terms">
            I agree to all statements in{" "}
            <a href="terms-conditions" id="terms">
              Terms of service
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <div
          className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.mx4} ${styles.mb2} ${styles.mbLg4}`}
        >
          <Link to="/login" className={styles.signupSecondary}>
            Already a User
          </Link>
          <button type="submit" className={`${styles.signupBtn} ${styles.me2}`}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
