import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart, useDispatchCart } from "../ContextReducer";
import Modal from "../../screens/Modal/Modal";
import Cart from "../../screens/Cart/Cart";
import PaymentGatewayModal from "../../screens/PaymentGatewayModal/PaymentGatewayModal";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaFileContract,
  FaChevronDown,
  FaHome,
  FaInfoCircle,
  FaSlidersH,
  FaHistory,
  FaStore,
  FaHeadset,
  FaQuestionCircle,
  FaCommentAlt,
  FaSearch,
  FaCalendarAlt,
  FaUtensils,
  FaChartLine,
  FaShoppingBag,
} from "react-icons/fa";
import styles from "./Navbar.module.css";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "customer"
  );
  const [cartView, setCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const data = useCart();
  const dispatch = useDispatchCart();
  const deliveryCharges = 50;
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (data.length === 0) {
        setRestaurantDetails(null);
        return;
      }
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          `${baseUrl}/api/restaurants/${data[0].restaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch restaurant");
        const restaurant = await res.json();
        setRestaurantDetails(restaurant);
      } catch (err) {
        setRestaurantDetails(null);
      }
    };
    fetchRestaurant();
  }, [data]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
      setUserName(localStorage.getItem("userName") || "");
      setUserRole(localStorage.getItem("userRole") || "customer");
    };

    const handleLogin = () => {
      setToken(localStorage.getItem("authToken"));
      setUserName(localStorage.getItem("userName") || "");
      setUserRole(localStorage.getItem("userRole") || "customer");
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLoggedIn", handleLogin);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", handleLogin);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    setToken(null);
    setUserName("");
    setUserRole("customer");
    navigate("/login");
    window.location.reload();
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const openPaymentModal = () => {
    setCart(false);
    setShowPaymentModal(true);
  };

  // Helper for active link
  const isActiveRoute = (path) => location.pathname === path;

  return (
    <nav className={styles.navbarMain}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarBrand}>
          <Link to="/" className={styles.brandLink}>
            <img
              src="/Logo.png"
              alt="DineSmart Logo"
              className={styles.navbarLogo}
            />
            <span className={styles.navbarLogoText}>DineSmart</span>
          </Link>
        </div>

        <input type="checkbox" id="navToggle" className={styles.navToggle} />
        <label htmlFor="navToggle" className={styles.navToggleLabel}>
          <span></span>
        </label>

        <div className={styles.navMenu}>
          <div className={styles.navLinks}>
            <Link
              to="/"
              className={`${styles.navLink} ${
                isActiveRoute("/") ? styles.navLinkActive : ""
              }`}
            >
              <FaHome className={styles.navIcon} /> Home
              <span className={styles.tooltip}>Go to homepage</span>
            </Link>
            <Link
              to="/about"
              className={`${styles.navLink} ${
                isActiveRoute("/about") ? styles.navLinkActive : ""
              }`}
            >
              <FaInfoCircle className={styles.navIcon} /> About
              <span className={styles.tooltip}>Learn more about DineSmart</span>
            </Link>
            <Link
              to="/features"
              className={`${styles.navLink} ${
                isActiveRoute("/features") ? styles.navLinkActive : ""
              }`}
            >
              <FaSlidersH className={styles.navIcon} /> Features
              <span className={styles.tooltip}>
                Discover all features we offer
              </span>
            </Link>

            {token && (
              <>
                {userRole === "customer" && (
                  <>
                    <Link
                      to="/myOrder"
                      className={`${styles.navLink} ${
                        isActiveRoute("/myOrder") ? styles.navLinkActive : ""
                      }`}
                    >
                      <FaHistory className={styles.navIcon} /> My Orders
                      <span className={styles.tooltip}>
                        View and manage your orders
                      </span>
                    </Link>
                    <Link
                      to="/booking-history"
                      className={`${styles.navLink} ${
                        isActiveRoute("/booking-history")
                          ? styles.navLinkActive
                          : ""
                      }`}
                    >
                      <FaCalendarAlt className={styles.navIcon} /> My Bookings
                      <span className={styles.tooltip}>
                        Check your table reservations
                      </span>
                    </Link>
                  </>
                )}

                {userRole === "restaurant_owner" && (
                  <>
                    <Link to="/manage-order" className={styles.navLink}>
                      <FaShoppingBag className={styles.navIcon} /> Orders
                      <span className={styles.tooltip}>
                        Handle customer orders
                      </span>
                    </Link>
                    <Link to="/manage-booking" className={styles.navLink}>
                      <FaCalendarAlt className={styles.navIcon} /> Bookings
                      <span className={styles.tooltip}>
                        View and manage bookings
                      </span>
                    </Link>

                    <div
                      className={styles.navDropdown}
                      onMouseEnter={() => setIsRestaurantOpen(true)}
                      onMouseLeave={() => setIsRestaurantOpen(false)}
                    >
                      <button className={styles.dropdownToggle}>
                        <FaCog className={styles.navIcon} /> Manage{" "}
                        <FaChevronDown className={styles.dropdownChevron} />
                      </button>
                      {isRestaurantOpen && (
                        <div className={styles.dropdownMenu}>
                          <Link
                            to="/my-restaurant"
                            className={`${styles.dropdownItem} ${
                              userRole === "restaurant_owner"
                                ? styles.ownerMenuItem
                                : ""
                            }`}
                          >
                            <FaStore className={styles.dropdownIcon} />{" "}
                            Restaurant
                            <span className={styles.tooltip}>
                              Add or update restaurant info
                            </span>
                          </Link>
                          <Link
                            to="/manage-menu"
                            className={`${styles.dropdownItem} ${
                              userRole === "restaurant_owner"
                                ? styles.ownerMenuItem
                                : ""
                            }`}
                          >
                            <FaUtensils className={styles.dropdownIcon} /> Menu
                            <span className={styles.tooltip}>
                              Customize your menu items
                            </span>
                          </Link>
                          <Link
                            to="/dashboard"
                            className={`${styles.dropdownItem} ${
                              userRole === "restaurant_owner"
                                ? styles.ownerMenuItem
                                : ""
                            }`}
                          >
                            <FaChartLine className={styles.dropdownIcon} />{" "}
                            Dashboard
                            <span className={styles.tooltip}>
                              View restaurant analytics
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div
                  className={styles.navDropdown}
                  onMouseEnter={() => setIsExploreOpen(true)}
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <button className={styles.dropdownToggle}>
                    <FaSearch className={styles.navIcon} /> Explore{" "}
                    <FaChevronDown className={styles.dropdownChevron} />
                  </button>
                  {isExploreOpen && (
                    <div className={styles.dropdownMenu}>
                      <Link to="/settings" className={styles.dropdownItem}>
                        <FaCog className={styles.dropdownIcon} /> Settings
                        <span className={styles.tooltip}>
                          Update your profile settings
                        </span>
                      </Link>
                      <Link to="/contact-us" className={styles.dropdownItem}>
                        <FaHeadset className={styles.dropdownIcon} /> Contact Us
                        <span className={styles.tooltip}>
                          Reach out for support
                        </span>
                      </Link>
                      <Link to="/faq" className={styles.dropdownItem}>
                        <FaQuestionCircle className={styles.dropdownIcon} /> FAQ
                        <span className={styles.tooltip}>
                          Find answers to common questions
                        </span>
                      </Link>
                      <Link to="/feedback" className={styles.dropdownItem}>
                        <FaCommentAlt className={styles.dropdownIcon} />{" "}
                        Feedback
                        <span className={styles.tooltip}>
                          Share your experience with us
                        </span>
                      </Link>
                      <Link
                        to="/terms-conditions"
                        className={styles.dropdownItem}
                      >
                        <FaFileContract className={styles.dropdownIcon} /> Terms
                        <span className={styles.tooltip}>
                          Read our terms and policies
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.navActions}>
            {token ? (
              <>
                {userRole === "customer" && (
                  <>
                    <button
                      className={styles.navCart}
                      onClick={() => {
                        setCart(true);
                        scrollToTop();
                      }}
                    >
                      <FaShoppingCart className={styles.navIcon} />
                      <span className={styles.tooltip}>View your cart</span>
                      {data.length > 0 && (
                        <span className={styles.cartBadge}>{data.length}</span>
                      )}
                    </button>
                    {cartView && (
                      <Modal onClose={() => setCart(false)}>
                        <Cart
                          onProceedToCheckout={openPaymentModal}
                          restaurantDetails={restaurantDetails}
                          cartData={data}
                          total={totalPrice + deliveryCharges}
                          deliveryCharges={deliveryCharges}
                          dispatch={dispatch}
                        />
                      </Modal>
                    )}
                    {showPaymentModal && (
                      <PaymentGatewayModal
                        show={showPaymentModal}
                        onClose={() => setShowPaymentModal(false)}
                        cartData={data}
                        restaurantDetails={restaurantDetails}
                        total={totalPrice + deliveryCharges}
                        deliveryCharges={deliveryCharges}
                        dispatch={dispatch}
                      />
                    )}
                  </>
                )}

                <div className={styles.userDropdown} ref={userMenuRef}>
                  <button
                    className={styles.userProfileBtn}
                    onClick={toggleUserMenu}
                  >
                    <FaUser className={styles.userIcon} />
                    {userName && (
                      <span className={styles.userBtnText}>
                        Hi, {userName.split(" ")[0]}
                      </span>
                    )}
                    <FaChevronDown
                      className={`${styles.dropdownChevron} ${
                        isUserMenuOpen ? styles.chevronUp : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className={styles.userDropdownMenu}>
                      <div className={styles.userDropdownHeader}>
                        <FaUser className={styles.userDropdownIcon} />
                        <span className={styles.userDropdownName}>
                          {userName || "User"}
                        </span>
                      </div>
                      <div className={styles.userDropdownDivider}></div>

                      <Link to="/settings" className={styles.userDropdownItem}>
                        <FaCog className={styles.dropdownIcon} /> Settings
                      </Link>
                      <div className={styles.userDropdownDivider}></div>
                      <button
                        onClick={handleLogout}
                        className={styles.userDropdownItem}
                      >
                        <FaSignOutAlt className={styles.dropdownIcon} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navButton}>
                  <FaUser className={styles.navIcon} /> Login
                  <span className={styles.tooltip}>Access your account</span>
                </Link>
                <Link to="/createuser" className={styles.signupBtn}>
                  Signup
                  <span className={styles.tooltip}>Create a new account</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
