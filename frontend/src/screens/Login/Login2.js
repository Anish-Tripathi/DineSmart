import React, { useState, useEffect, useRef } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  const captchaRef = useRef(null);
  let navigate = useNavigate();

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setCaptchaLoaded(true);
        renderRecaptcha();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;

      // Define global callback function
      window.onRecaptchaLoad = () => {
        setCaptchaLoaded(true);
        renderRecaptcha();
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        delete window.onRecaptchaLoad;
      };
    };

    loadRecaptcha();
  }, []);

  const renderRecaptcha = () => {
    if (window.grecaptcha && captchaRef.current) {
      try {
        window.grecaptcha.render(captchaRef.current, {
          sitekey:
            process.env.REACT_APP_RECAPTCHA_SITE_KEY ||
            "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // Test key
          callback: (token) => {
            setCaptchaToken(token);
          },
          "expired-callback": () => {
            setCaptchaToken("");
          },
          "error-callback": () => {
            setCaptchaToken("");
            setMessage("CAPTCHA error occurred. Please refresh and try again.");
            setMessageType("error");
          },
        });
      } catch (error) {
        console.error("Error rendering reCAPTCHA:", error);
      }
    }
  };

  const resetCaptcha = () => {
    if (window.grecaptcha && captchaLoaded) {
      try {
        window.grecaptcha.reset();
        setCaptchaToken("");
      } catch (error) {
        console.error("Error resetting reCAPTCHA:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if CAPTCHA is completed
    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA verification");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          rememberMe: rememberMe,
          captchaToken: captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.authToken) {
          throw new Error("No authentication token received");
        }

        setMessage("Login successful!");
        setMessageType("success");

        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userRole", data.user.role);
        if (data.user.role === "restaurant_owner") {
          localStorage.setItem("restaurantId", data.user.restaurantId);
        }

        window.dispatchEvent(new Event("userLoggedIn"));

        setTimeout(() => {
          setIsLoading(false);
          if (data.user.role === "restaurant_owner") {
            navigate("/");
          } else {
            navigate("/");
          }
          window.location.reload();
        }, 1000);
      } else {
        setMessage(data.message || "Failed to login");
        setMessageType("error");
        setIsLoading(false);
        resetCaptcha(); // Reset CAPTCHA on failed login
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message);
      setMessageType("error");
      setIsLoading(false);
      resetCaptcha(); // Reset CAPTCHA on error
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <p className={styles.loginSubtitle}>
          Log in and pick up where you left off!!
        </p>

        {message && (
          <div
            className={`${styles.message} ${
              messageType === "success" ? styles.success : styles.error
            }`}
          >
            {message}
          </div>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* CAPTCHA Section */}
          <div className={styles.formGroup}>
            <div className={styles.captchaContainer}>
              <div ref={captchaRef} className={styles.captcha}></div>
              {!captchaLoaded && (
                <div className={styles.captchaLoading}>Loading CAPTCHA...</div>
              )}
            </div>
          </div>

          <div className={styles.formOptions}>
            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleCheckboxChange}
                disabled={isLoading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isLoading || !captchaToken}
          >
            {isLoading ? (
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className={styles.signupPrompt}>
          <p>
            Don't have an account?{" "}
            <Link to="/createuser" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
