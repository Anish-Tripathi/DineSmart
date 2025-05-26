import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer";
import Layout from "./screens/Login/Layout.js";
import ScrollToTop from "./components/ScrollToTop.js";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";

// Import screens
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import MyOrder from "./screens/MyOrder/MyOrder";
import NotFound from "./screens/NotFound/NotFound.js";
import Contact from "./screens/Contact/Contact.js";
import Feature from "./screens/Feature/Feature.js";
import AboutUs from "./screens/AboutUs/AboutUs.js";
import TermsAndConditions from "./screens/TermsAndConditions/TermsAndConditions.js";
import TrackOrder from "./screens/TrackOrder/TrackOrder.js";
import BookTable from "./screens/BookTable/BookTable.js";
import Settings from "./screens/Settings/Settings.js";
import Faq from "./screens/FAQ/FAQ.js";
import FeedbackPage from "./screens/FeedbackPage/FeedbackPage.js";
import MenuDisplay from "./components/MenuDisplay/MenuDisplay";
import BookingHistory from "./screens/BookingHistory/BookingHistory.js";
import MyRestaurant from "./screens/MyRestaurant/MyRestaurant.js";
import ManageOrders from "./screens/ManageOrders/ManageOrders.js";
import ManageBooking from "./screens/ManageBooking/ManageBooking.js";
import RestaurantDashboard from "./screens/RestaurantDashboard/RestaurantDashboard.js";
import ManageMenu from "./screens/ManageMenu/ManageMenu.js";
import ForgotPassword from "./screens/Login/ForgotPassword.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Toaster richColors position="top-center" />
        <div className="main-content">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/contact-us"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/features"
              element={
                <Layout>
                  <Feature />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutUs />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Layout>
                  <ForgotPassword />
                </Layout>
              }
            />
            <Route
              path="/createuser"
              element={
                <Layout>
                  <Signup />
                </Layout>
              }
            />
            <Route
              path="/terms-conditions"
              element={
                <Layout>
                  <TermsAndConditions />
                </Layout>
              }
            />
            <Route
              path="/faq"
              element={
                <Layout>
                  <Faq />
                </Layout>
              }
            />
            <Route
              path="/feedback"
              element={
                <Layout>
                  <FeedbackPage />
                </Layout>
              }
            />
            <Route
              path="/menu/:restaurantId"
              element={
                <Layout>
                  <MenuDisplay />
                </Layout>
              }
            />

            {/* Customer-only routes */}
            <Route
              path="/myOrder"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Layout>
                    <MyOrder />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-history"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Layout>
                    <BookingHistory />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-table"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Layout>
                    <BookTable />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-table/:id"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Layout>
                    <BookTable />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/track-order"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <Layout>
                    <TrackOrder />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["customer", "restaurant_owner"]}>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Restaurant owner-only routes */}
            <Route
              path="/my-restaurant"
              element={
                <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                  <Layout>
                    <MyRestaurant />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                  <Layout>
                    <RestaurantDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-menu"
              element={
                <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                  <Layout>
                    <ManageMenu />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-order"
              element={
                <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                  <Layout>
                    <ManageOrders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-booking"
              element={
                <ProtectedRoute allowedRoles={["restaurant_owner"]}>
                  <Layout>
                    <ManageBooking />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
