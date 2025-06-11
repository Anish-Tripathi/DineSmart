# DineSmart - Smart Restaurant Discovery & Food Ordering Platform

<div align="center">
  <img src="./frontend/public/Logo.png" alt="DineSmart Logo" width="200"/>
</div>


**DineSmart** is a comprehensive, full-stack restaurant discovery and food ordering platform that revolutionizes how customers find restaurants and how owners manage their business. Built with the MERN stack, it features intelligent filtering, real-time order tracking, secure authentication, and role-based access control.

---

## 📋 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [📸 Preview](#-preview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🔌 API Documentation](#-api-documentation)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [🙏 Acknowledgments](#-acknowledgments)

---

### 🎯 Key Highlights

**Fully Role-Based Single Page Application (SPA)**  
 Supports different user roles with tailored interfaces and access control, including customers and restaurant owners.

- **Advanced Filtering, Searching, and Sorting**  
  Helps users quickly find restaurants and menu items based on multiple criteria for an optimized discovery experience.

- **Nutritional Tagging, Allergen Information & Dietary Filters**  
  Menus display detailed nutritional and allergen info, allowing users to filter dishes according to dietary preferences and restrictions.

- **Integrated Coupon & Discount System**  
  Real-time price updates during ordering reflect applied coupons and discounts seamlessly.

- **Realistic User Journey for Dine-In and Delivery**  
  Comprehensive flow covering browsing, ordering, payment, and order tracking for both dine-in and delivery services.

- **Dynamic Restaurant Dashboard for Owners**  
  Provides analytics, order management, and operational insights to help restaurant owners optimize their services.

---

## 🚀 Live Demo

🌐 **[Try DineSmart Live](https://dinesmart-1.onrender.com/)**

🎥 **Demo Video:**

coming soon ...

---
## 📸 Preview

> If any uploaded image appears scaled or unclear, please click on the image to view it in full resolution for better clarity.

---

<details>
<summary>🔐 Authentication Flow</summary>

<div align="center">
  <img src="./screenshots/login.png" alt="Login" width="400" height="250"/>
  <img src="./screenshots/signup.png" alt="Signup" width="400" height="250"/>
  <img src="./screenshots/forgot-password.png" alt="Forgot Password" width="400" height="250"/>
  <img src="./screenshots/reset-password.png" alt="Reset Password" width="400" height="250"/>
  <p><em>User login, sign-up, and password recovery</em></p>
</div>

</details>

---

<details>
<summary>👤 Customer View</summary>

#### 🏠 Homepage & Info

<table align="center">
  <tr>
    <td align="center">
      <img src="./screenshots/homepage-customer.png" alt="Customer Homepage" width="400" height="250"/>
      <br/><em>Personalized Restaurant Discovery</em>
    </td>
    <td align="center">
      <img src="./screenshots/homepage-owner.png" alt="Owner Homepage" width="400" height="250"/>
      <br/><em>Restaurant Owner Dashboard</em>
    </td>
  </tr>
  <tr>
     <td align="center">
      <img src="./screenshots/about.png" alt="About Page" width="400" height="250"/>
      <br/><em>About Us – Our Mission</em>
    </td>
    <td align="center">
      <img src="./screenshots/features.png" alt="Features Page" width="400" height="250"/>
      <br/><em>Role Based Feature Overview</em>
    </td>
  </tr>
</table>

#### 🍽️ Menu & Ordering

<div align="center">
  <img src="./screenshots/restaurant-list.png" alt="Restaurant List" width="400" height="250"/>
  <img src="./screenshots/customer-menu.png" alt="Customer Menu" width="400" height="250"/>
  <br/><em>Browse restaurants and explore detailed menus</em>
</div>

<div align="center">
  <img src="./screenshots/nutrition.png" alt="Item Customization" width="400" height="250"/>
  <img src="./screenshots/cart.png" alt="Add to Cart" width="400" height="250"/>
  <br/><em>Customize items and add them to cart</em>
</div>

<div align="center">
  <img src="./screenshots/cart-details.png" alt="Cart" width="400" height="250"/>
  <img src="./screenshots/cart-payment.png" alt="Cart Payment" width="400" height="250"/>
  <br/><em>Cart overview and secure payment</em>
</div>

<div align="center">
  <img src="./screenshots/cart-confirmation.png" alt="Order Confirmation" width="400" height="250"/>
  <img src="./screenshots/cart-reciept.png" alt="Thank You Page" width="400" height="250"/>
  <br/><em>Order confirmation and success message</em>
</div>

#### 🍽️ Table Booking

<div align="center">
  <img src="./screenshots/booking-table.png" alt="Table Booking" width="400" height="250"/>
  <img src="./screenshots/booking-form.png" alt="Booking Details" width="400" height="250"/>
  <br/><em>Book a table and fill in details</em>
</div>

<div align="center">
  <img src="./screenshots/booking-confirmation.png" alt="Booking Confirmation" width="400" height="250"/>
  <img src="./screenshots/booking-tracking.png" alt="Booking Tracking" width="400" height="250"/>
  <br/><em>Get confirmation and track reservation status</em>
</div>

#### 📦 Order Management

<div align="center">
  <img src="./screenshots/order-history.png" alt="Order History" width="400" height="250"/>
  <img src="./screenshots/order-details.png" alt="Order Details" width="400" height="250"/>
  <br/><em>Access full order history with details</em>
</div>

<div align="center">
  <img src="./screenshots/order-reciept.png" alt="Order Feedback" width="400" height="250"/>
  <img src="./screenshots/order-tracking.png" alt="Order Tracking" width="400" height="250"/>
  <br/><em>Track delivery and leave feedback</em>
</div>

</details>

---

<details>
<summary>🧑‍🍳 Owner View</summary>

#### 🏪 Restaurant & Menu Management

<div align="center">
  <img src="./screenshots/owner-add-restaurant.png" alt="Add Restaurant" width="400" height="250"/>
  <img src="./screenshots/owner-restaurant-management.png" alt="Manage Restaurant" width="400" height="250"/>
  <br/><em>Add and manage restaurant details</em>
</div>

<div align="center">
  <img src="./screenshots/owner-menu-edit-restaurant.png" alt="Add Restaurant" width="400" height="250"/>
  <img src="./screenshots/owner-dashboard.png" alt="Manage Restaurant" width="400" height="250"/>
  <br/><em>Manage restaurant analytics through dashboard</em>
</div>

<div align="center">
  <img src="./screenshots/owner-menu-management.png" alt="Menu Management" width="400" height="250"/>
  <img src="./screenshots/owner-add-menu-items.png" alt="Manage Menu Items" width="400" height="250"/>
  <br/><em>Manage menus and menu items</em>
</div>

#### 📋 Order & Booking Controls

<div align="center">
  <img src="./screenshots/owner-order-management.png" alt="Order Management" width="400" height="250"/>
  <img src="./screenshots/owner-order-details.png" alt="Owner Dashboard" width="400" height="250"/>
  <br/><em>Control customer order and real time status</em>
</div>

<div align="center">
  <img src="./screenshots/owner-booking-management.png" alt="Booking Management" width="400" height="250"/>
  <img src="./screenshots/owner-booking-details.png" alt="Owner Analytics" width="400" height="250"/>
  <br/><em>Control table bookings and real time status</em>
</div>

</details>

---

<details>
<summary>🧾 Common Pages</summary>

<div align="center">
  <img src="./screenshots/settings.png" alt="Settings Page" width="400" height="250"/>
  <img src="./screenshots/terms.png" alt="Terms and Conditions" width="400" height="250"/>
  <br/><em>Settings & Terms of Use</em>
</div>

<div align="center">
  <img src="./screenshots/faq.png" alt="FAQ" width="400" height="250"/>
  <img src="./screenshots/feedback.png" alt="Feedback Page" width="400" height="250"/>
  <br/><em>Frequently Asked Questions and Feedback Form</em>
</div>

<div align="center">
  <img src="./screenshots/contact-us.png" alt="Contact Us" width="400" height="250"/>
  <img src="./screenshots/footer.png" alt="Footer" width="400" height="250"/>
  <br/><em>Contact-Us and Role based footer</em>
</div>

</details>

---


## ✨ Features

### 👤 **Customer Experience**

#### 🔐 **Authentication & Security**

- **Multi-role Signup**: Customer and Restaurant Owner registration
- **Secure Login**: Email/password with alphanumeric CAPTCHA verification
- **Password Recovery**: Email-based OTP verification for password reset
- **Profile Management**: Update personal details and notification preferences

#### 🏠 **Smart Home Page**

- **Interactive Food Carousel**: Stunning zoom effects showcasing featured dishes
- **Intelligent Search**: Find restaurants by dish name, location, or cuisine
- **Advanced Filtering System**:
  - Location-based (current location + 10km radius)
  - Dietary preferences (Veg/Jain options)
  - Price range filtering
  - Ratings and reviews
  - Cuisine type selection
  - Delivery time estimation
  - Smart sorting (price/rating: high-to-low, low-to-high)

#### 🍽️ **Restaurant & Menu Management**

- **Detailed Restaurant Cards**: Promotions, ratings, and key information
- **Comprehensive Menu View**:
  - Categorized menu items for easy navigation
  - Nutritional filtering (proteins, carbs, fats, calories)
  - Ingredient and allergen information
  - Cuisine type indicators (spicy, sweet, etc.)
  - Customer ratings and reviews
- **Smart Menu Search**: Find items by name, ingredients, or cuisine type

#### 🛒 **Shopping & Ordering**

- **Intelligent Cart System**:
  - Single restaurant ordering (auto-clear for different restaurants)
  - Real-time item count in navbar
  - Quantity management and price calculation
- **3-Step Secure Checkout**:
  1. **Order Review**: Apply DineSmart offers and promotional coupons
  2. **Payment Options**: Card, UPI, or Cash on Delivery
  3. **Order Confirmation**: Downloadable PDF receipt

#### 📦 **Order Management**

- **Real-time Order Tracking**: Live status updates from preparation to delivery
- **Order History**: Filter by date, restaurant, status, or order details
- **Order Status Tracking**:
  - Preparing → Out for Delivery → Delivered
  - Estimated delivery time with restaurant contact info
- **Smart Filters**: Search orders by multiple criteria

#### 🪑 **Table Reservation System**

- **Easy Booking Process**: Select guests, date, time with zero booking fee
- **Booking Management**:
  - Current and past reservations
  - Cancellation up to 2 hours before booking time
  - Downloadable booking confirmation PDF
- **Flexible Filtering**: Filter bookings by date, time, restaurant, or status

### 🧑‍🍳 **Restaurant Owner Dashboard**

#### 🏪 **Restaurant Management**

- **Complete Restaurant Profile**:
  - Business details, location, cuisine type
  - Contact information and descriptions
  - Achievement showcases
  - Promotional offer management
- **Dynamic Promotions**:
  - Create/edit promotional coupons
  - Set validity periods and discount percentages
  - Activate/deactivate promotions instantly

#### 📋 **Menu Management System**

- **Category-based Organization**: Structured menu layout
- **Comprehensive Item Details**:
  - Item name, cuisine type, images
  - Detailed ingredient lists
  - Allergen information
  - Complete nutritional data
  - Pricing and descriptions
- **Bulk Management**: Table view for easy menu item editing and removal

#### 📊 **Business Analytics**

- **Performance Dashboard**: Revenue, ratings, and trend analysis
- **Order Analytics**: Track order volume and patterns
- **Customer Insights**: Understanding customer preferences

#### 🛎️ **Order & Booking Management**

- **Real-time Order Processing**:
  - Filter orders by status, date, and details
  - Update order status instantly
  - View complete order information
  - Order count dashboard (total, pending, completed, preparing)
- **Table Booking Management**:
  - View all reservations with detailed customer information
  - Update booking status
  - Filter bookings by multiple criteria

### 🔄 **Role-Based Access Control**

- **Dynamic Navigation**: Role-specific menu items and features
- **Secure Route Protection**: Access control based on user roles
- **Customized UI Components**: Different layouts for customers vs owners

### 📱 **Universal Features**

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Settings Management**: Profile updates and notification controls
- **Help & Support**: FAQ, Terms & Conditions, Contact Us, About Us
- **Smart Footer**: Role-based information display

---

## 🛠️ Tech Stack

### **Frontend**

| Technology   | Purpose             | Version |
| ------------ | ------------------- | ------- |
| React        | UI Framework        | 18.2.0+ |
| React Router | Client-side Routing | 6.8.0+  |
| CSS Modules  | Styling             | -       |
| Axios        | HTTP Client         | 1.3.0+  |
| Lucide React | Icons               | Latest  |

### **Backend**

| Technology | Purpose             | Version |
| ---------- | ------------------- | ------- |
| Node.js    | Runtime Environment | 18.0+   |
| Express.js | Web Framework       | 4.18.0+ |
| MongoDB    | Database            | 6.0+    |
| Mongoose   | ODM                 | 7.0+    |
| JWT        | Authentication      | 9.0+    |

### **Additional Tools**

- **Security**: Bcrypt, CAPTCHA, Express Validator
- **Communication**: Nodemailer for email services
- **Authentication**: Admin SDK
- **Development**: dotenv, cors, nodemon

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
MongoDB >= 6.0.0
npm or yarn package manager
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dinesmart.git
cd dinesmart
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/dinesmart
MONGODB_TEST_URI=mongodb://localhost:27017/dinesmart_test

# JWT & Security
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d
BCRYPT_SALT_ROUNDS=12

# Email Configuration (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Application Settings
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# CAPTCHA Configuration
CAPTCHA_SECRET=your-captcha-secret-key
```

### 4. Database Setup

```bash
# Start MongoDB service
mongod

# Seed the database with sample data (optional)
cd backend
cd config
node seed.js
```

### 5. Start the Application

```bash
# Start backend server (runs on port 5000)
cd backend
nodemon index.js

# In a new terminal, start frontend (runs on port 3000)
cd frontend
npm start
```

---

## 🔌 API Documentation

### Authentication Endpoints

```http
POST /api/auth/createuser        # User registration
POST /api/auth/login             # User login
POST /api/auth/logout            # User logout
POST /api/auth/forgot-password   # Password reset request
POST /api/auth/reset-password    # Password reset confirmation
GET  /api/auth/verify-token      # Token verification
```

### Customer Endpoints

```http
GET    /api/restaurants          # Get all restaurants
GET    /api/restaurants/:id      # Get restaurant details
GET    /api/restaurants/:id/menu # Get restaurant menu
POST   /api/orders               # Create new order
GET    /api/orders               # Get user orders
GET    /api/orders/:id           # Get order details
PUT    /api/orders/:id/status    # Update order status
POST   /api/bookings             # Create table booking
GET    /api/bookings             # Get user bookings
PUT    /api/bookings/:id         # Update booking
DELETE /api/bookings/:id         # Cancel booking
```

### Owner Endpoints

```http
POST   /api/owner/restaurants    # Create restaurant
PUT    /api/owner/restaurants/:id # Update restaurant
GET    /api/owner/restaurants    # Get owned restaurants
POST   /api/owner/menu           # Add menu item
PUT    /api/owner/menu/:id       # Update menu item
DELETE /api/owner/menu/:id       # Delete menu item
GET    /api/owner/orders         # Get restaurant orders
PUT    /api/owner/orders/:id     # Update order status
GET    /api/owner/bookings       # Get restaurant bookings
POST   /api/owner/coupons        # Create coupon
PUT    /api/owner/coupons/:id    # Update coupon
```

---

## 📁 Project Structure

```
dinesmart/
├── 📁 frontend/                    # React frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 pages/            # Page components (each page has its own folder with .js and .module.css files)
│   │   ├── 📁 context/          # React context providers
│   └── 📄 package.json
├── 📁 backend/                   # Node.js backend
│   ├── 📁 controllers/          # Route controllers
│   ├── 📁 models/              # Mongoose schemas
│   ├── 📁 routes/              # Express routes
│   ├── 📁 middleware/          # Custom middleware
│   ├── 📁 services/            # Business logic services
│   ├── 📁 utils/               # Utility functions
│   ├── 📁 config/              # Configuration files
│   └── 📄 server.js            # Entry point
├── 📁 screenshots/                  # Project assets (screenshots, etc.)
├── 📄 README.md
```

## Note:

> - Inside `frontend/src/screens/`, `frontend/src/components/` and each page is organized in its own folder, and typically contains its main `.js` file and a corresponding `.module.css` file for modular styling.

---

## 🤝 Contributing

We welcome contributions!

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 🙏 Acknowledgments

- Inspiration from modern food delivery platforms like zomato and swiggy.
- Open source community for amazing tools and libraries

---
