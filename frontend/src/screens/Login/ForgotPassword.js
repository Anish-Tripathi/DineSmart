import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(`${baseUrl}/api/auth/send-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Reset code sent to your email. Check your inbox!");
        setMessageType("success");
        setStep(2);
      } else {
        setMessage(data.message || "Failed to send reset code");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      setMessage("Failed to send reset code. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!resetCode) {
      setMessage("Please enter the reset code");
      setMessageType("error");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(`${baseUrl}/api/auth/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: resetCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Code verified successfully");
        setMessageType("success");
        setStep(3); // Move to password reset step
      } else {
        setMessage(data.message || "Invalid reset code");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("Failed to verify code. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("Please enter and confirm your new password");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 5) {
      setMessage("Password must be at least 5 characters long");
      setMessageType("error");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(`${baseUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: resetCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Password reset successfully! You can now login with your new password."
        );
        setMessageType("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Failed to reset password");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch(`${baseUrl}/api/auth/resend-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("New reset code sent to your email");
        setMessageType("success");
      } else {
        setMessage(data.message || "Failed to resend code");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      setMessage("Failed to resend code. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.forgotPasswordCard}>
        <button
          className={styles.backButton}
          onClick={handleBackToLogin}
          disabled={isLoading}
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className={styles.iconContainer}>
          {step > 1 ? (
            <CheckCircle size={48} className={styles.successIcon} />
          ) : (
            <Mail size={48} className={styles.mailIcon} />
          )}
        </div>

        <h2 className={styles.title}>
          {step === 1
            ? "Reset Password"
            : step === 2
            ? "Enter Reset Code"
            : "Set New Password"}
        </h2>

        <p className={styles.subtitle}>
          {step === 1
            ? "Enter your email address and we'll send you a code to reset your password."
            : step === 2
            ? "Enter the 6-digit code we sent to your email address."
            : "Create a new password for your account."}
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

        {step === 1 ? (
          <form onSubmit={handleSendCode}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <span>Sending Code...</span>
                </div>
              ) : (
                "Send Reset Code"
              )}
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleVerifyCode}>
            <div className={styles.formGroup}>
              <label htmlFor="code">Reset Code</label>
              <input
                type="text"
                id="code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                disabled={isLoading}
                maxLength="6"
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Code"
              )}
            </button>

            <button
              type="button"
              onClick={handleResendCode}
              className={styles.secondaryBtn}
              disabled={isLoading}
            >
              Resend Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <span>Resetting Password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <div className={styles.helpText}>
          <p>
            <strong>Need help?</strong>
          </p>
          <ul>
            <li>Check your spam/junk folder</li>
            <li>Make sure you entered the correct email address</li>
            <li>Wait a few minutes for the code to arrive</li>
            {step === 2 && <li>Request a new code if it's not working</li>}
          </ul>
        </div>

        <div className={styles.loginPrompt}>
          <p>
            Remember your password?{" "}
            <Link to="/login" className={styles.loginLink}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
