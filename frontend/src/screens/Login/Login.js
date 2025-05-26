import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  let navigate = useNavigate();

  const fetchCaptcha = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/captcha`, {
        credentials: "include", // Important for session-based captcha!
      });
      const svg = await response.text();
      setCaptchaSvg(svg);
      setCaptchaInput("");
    } catch (error) {
      setCaptchaSvg("");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleRefreshCaptcha = (e) => {
    e.preventDefault();
    fetchCaptcha();
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

    if (!captchaInput) {
      setMessage("Please enter the CAPTCHA");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session!
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          rememberMe: rememberMe,
          captcha: captchaInput,
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
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        setMessage(data.message || "Failed to login");
        setMessageType("error");
        setIsLoading(false);
        fetchCaptcha(); // Refresh CAPTCHA on failed login
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
      setIsLoading(false);
      fetchCaptcha();
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
              <div
                dangerouslySetInnerHTML={{ __html: captchaSvg }}
                style={{ display: captchaSvg ? "block" : "none" }}
              />
              <button
                type="button"
                onClick={handleRefreshCaptcha}
                className={styles.refreshCaptchaBtn}
                aria-label="Refresh CAPTCHA"
                style={{ marginLeft: 8, cursor: "pointer" }}
              >
                ↻
              </button>
            </div>
            <input
              type="text"
              name="captcha"
              placeholder="Enter CAPTCHA"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="off"
              style={{ marginTop: 8 }}
            />
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
            disabled={isLoading}
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
