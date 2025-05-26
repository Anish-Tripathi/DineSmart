import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import {
  ChevronRight,
  User,
  Shield,
  Bell,
  Lock,
  Save,
  X,
  Edit,
} from "lucide-react";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Settings = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
    privacySettings: {
      publicProfile: false,
      onlineStatus: true,
      dataCollection: true,
    },
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${baseUrl}/api/user`, {
          headers: {
            "auth-token": token,
          },
        });

        if (response.data.success) {
          setUser({
            ...response.data.user,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        setMessage({ text: "Failed to fetch user data", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleToggleChange = (settingType, field) => {
    if (settingType === "notification") {
      setUser((prevUser) => ({
        ...prevUser,
        notificationPreferences: {
          ...prevUser.notificationPreferences,
          [field]: !prevUser.notificationPreferences[field],
        },
      }));
    } else if (settingType === "privacy") {
      setUser((prevUser) => ({
        ...prevUser,
        privacySettings: {
          ...prevUser.privacySettings,
          [field]: !prevUser.privacySettings[field],
        },
      }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${baseUrl}/api/user/profile`,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          location: user.location,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setIsEditing(false);
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update profile",
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (user.newPassword !== user.confirmPassword) {
      setMessage({ text: "Passwords don't match", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${baseUrl}/api/user/password`,
        {
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        setMessage({ text: "Password updated successfully!", type: "success" });
        setIsEditing(false);
        setUser((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update password",
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${baseUrl}/api/user/notifications`,
        {
          emailNotifications: user.notificationPreferences.email,
          pushNotifications: user.notificationPreferences.push,
          smsNotifications: user.notificationPreferences.sms,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        setMessage({
          text: "Notification preferences updated!",
          type: "success",
        });
      }
    } catch (err) {
      setMessage({ text: "Failed to update notifications", type: "error" });
    } finally {
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
  };

  const handleSavePrivacy = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${baseUrl}/api/user/privacy`,
        {
          publicProfile: user.privacySettings.publicProfile,
          onlineStatus: user.privacySettings.onlineStatus,
          dataCollection: user.privacySettings.dataCollection,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      if (response.data.success) {
        setMessage({ text: "Privacy settings updated!", type: "success" });
      }
    } catch (err) {
      setMessage({ text: "Failed to update privacy settings", type: "error" });
    } finally {
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload original data
    const token = localStorage.getItem("authToken");
    axios
      .get(`${baseUrl}/api/user`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUser({
            ...response.data.user,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      });
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "profile":
        return <User size={18} />;
      case "security":
        return <Shield size={18} />;
      case "notifications":
        return <Bell size={18} />;
      case "privacy":
        return <Lock size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Settings</h2>
          <ul className={styles.menu}>
            {["profile", "security", "notifications", "privacy"].map((tab) => (
              <li
                key={tab}
                className={`${styles.menuItem} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className={styles.menuIcon}>{getTabIcon(tab)}</span>
                <span className={styles.menuText}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
                <ChevronRight
                  size={16}
                  className={`${styles.menuArrow} ${
                    activeTab === tab ? styles.activeArrow : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.content}>
          {message.text && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}

          {activeTab === "profile" && (
            <div className={styles.tabContent}>
              <div className={styles.headerActions}>
                <div className={styles.sectionHeader}>
                  <div className={styles.headerIcon}>
                    <User size={20} />
                  </div>
                  <h2>Profile Settings</h2>
                </div>
                {!isEditing ? (
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} className={styles.buttonIcon} />
                    Edit Profile
                  </button>
                ) : (
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.saveButton}
                      onClick={handleSaveProfile}
                    >
                      <Save size={16} className={styles.buttonIcon} />
                      Save Changes
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancel}
                    >
                      <X size={16} className={styles.buttonIcon} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSaveProfile}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                      rows="3"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location">Location (City/State)</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={user.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles.tabContent}>
              <div className={styles.headerActions}>
                <div className={styles.sectionHeader}>
                  <div className={styles.headerIcon}>
                    <Shield size={20} />
                  </div>
                  <h2>Security Settings</h2>
                </div>
                {!isEditing ? (
                  <button
                    className={styles.editButton}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} className={styles.buttonIcon} />
                    Change Password
                  </button>
                ) : (
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.saveButton}
                      onClick={handleSavePassword}
                    >
                      <Save size={16} className={styles.buttonIcon} />
                      Save Changes
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancel}
                    >
                      <X size={16} className={styles.buttonIcon} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSavePassword}>
                  <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={user.currentPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={user.newPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={!isEditing ? styles.inputDisabled : ""}
                    />
                  </div>

                  <div className={styles.formDivider}></div>

                  <div className={styles.formGroup}>
                    <h3>Two-Factor Authentication</h3>
                    <p className={styles.securityDescription}>
                      Add an extra layer of security to your account with
                      two-factor authentication
                    </p>
                    <div className={styles.toggleContainer}>
                      <span>Enable 2FA</span>
                      <label className={styles.switch}>
                        <input type="checkbox" disabled={!isEditing} />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerIcon}>
                  <Bell size={20} />
                </div>
                <h2>Notification Preferences</h2>
              </div>

              <div className={styles.card}>
                <div className={styles.form}>
                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>Email Notifications</h3>
                      <p className={styles.notificationDescription}>
                        Receive updates and alerts via email
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={user.notificationPreferences.email}
                          onChange={() =>
                            handleToggleChange("notification", "email")
                          }
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formDivider}></div>

                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>Push Notifications</h3>
                      <p className={styles.notificationDescription}>
                        Get real-time alerts on your device
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formDivider}></div>

                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>SMS Notifications</h3>
                      <p className={styles.notificationDescription}>
                        Receive important alerts via text message
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveNotifications}
                    style={{ marginTop: "20px" }}
                  >
                    <Save size={16} className={styles.buttonIcon} />
                    Save Notification Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className={styles.tabContent}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerIcon}>
                  <Lock size={20} />
                </div>
                <h2>Privacy Settings</h2>
              </div>

              <div className={styles.card}>
                <div className={styles.form}>
                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>Public Profile</h3>
                      <p className={styles.notificationDescription}>
                        Make your profile visible to other users
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={user.privacySettings.publicProfile}
                          onChange={() =>
                            handleToggleChange("privacy", "publicProfile")
                          }
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formDivider}></div>

                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>Online Status</h3>
                      <p className={styles.notificationDescription}>
                        Show when you're active on the platform
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.formDivider}></div>

                  <div className={styles.notificationGroup}>
                    <div className={styles.notificationHeader}>
                      <h3>Data Collection</h3>
                      <p className={styles.notificationDescription}>
                        Allow us to collect usage data to improve your
                        experience
                      </p>
                    </div>
                    <div className={styles.toggleContainer}>
                      <label className={styles.switch}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                  <button
                    className={styles.saveButton}
                    onClick={handleSavePrivacy}
                    style={{ marginTop: "20px" }}
                  >
                    <Save size={16} className={styles.buttonIcon} />
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
