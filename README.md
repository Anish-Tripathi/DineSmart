# 🍽️ DineSmart - Smart Restaurant Discovery & Food Ordering Platform

<div align="center">
  <img src="./assets/logo.png" alt="DineSmart Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg)](https://mongodb.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

## 📖 Overview

**DineSmart** is a comprehensive, full-stack restaurant discovery and food ordering platform that revolutionizes how customers find restaurants and how owners manage their business. Built with the MERN stack, it features intelligent filtering, real-time order tracking, secure authentication, and role-based access control.

### 🎯 Key Highlights

- **Smart Discovery**: AI-powered restaurant recommendations with location-based filtering
- **Dual Experience**: Separate optimized interfaces for customers and restaurant owners
- **Real-time Operations**: Live order tracking and instant status updates
- **Secure & Scalable**: JWT authentication with OTP verification and captcha protection
- **Mobile-First Design**: Responsive UI that works seamlessly across all devices

---

## 🚀 Live Demo

🌐 **[Try DineSmart Live](https://dinesmart-demo.com)**

### Demo Credentials

**Customer Account:**

- Email: `customer@demo.com`
- Password: `demo123`

**Restaurant Owner:**

- Email: `owner@demo.com`
- Password: `demo123`

---

## 📱 Screenshots

<div align="center">
  <img src="./assets/screenshots/homepage.png" alt="Homepage" width="800"/>
  <p><em>Homepage with smart restaurant discovery</em></p>
</div>

<div align="center">
  <img src="./assets/screenshots/restaurant-list.png" alt="Restaurant List" width="400"/>
  <img src="./assets/screenshots/menu-view.png" alt="Menu View" width="400"/>
  <p><em>Restaurant listings and detailed menu view</em></p>
</div>

<div align="center">
  <img src="./assets/screenshots/order-tracking.png" alt="Order Tracking" width="800"/>
  <p><em>Real-time order tracking interface</em></p>
</div>

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
  - 📍 Location-based (current location + 10km radius)
  - 🥬 Dietary preferences (Veg/Jain options)
  - 💰 Price range filtering
  - ⭐ Ratings and reviews
  - 🍜 Cuisine type selection
  - ⏱️ Delivery time estimation
  - 📊 Smart sorting (price/rating: high-to-low, low-to-high)

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

| Technology                                                                                                     | Purpose             | Version |
| -------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)                      | UI Framework        | 18.2.0+ |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | Client-side Routing | 6.8.0+  |
| ![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=flat&logo=css3&logoColor=white)           | Styling             | -       |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                      | HTTP Client         | 1.3.0+  |
| ![Lucide React](https://img.shields.io/badge/Lucide-F56565?style=flat&logo=lucide&logoColor=white)             | Icons               | Latest  |

### **Backend**

| Technology                                                                                            | Purpose             | Version |
| ----------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)       | Runtime Environment | 18.0+   |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Web Framework       | 4.18.0+ |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)       | Database            | 6.0+    |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)    | ODM                 | 7.0+    |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)       | Authentication      | 9.0+    |

### **Additional Tools**

- **Security**: Bcrypt, CAPTCHA, Express Validator
- **Communication**: Nodemailer for email services
- **Authentication**: Firebase Auth & Admin SDK
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
cd client
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

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# Application Settings
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# CAPTCHA Configuration
CAPTCHA_SECRET=your-captcha-secret-key

# Payment Gateway (if applicable)
PAYMENT_GATEWAY_KEY=your-payment-gateway-key
PAYMENT_GATEWAY_SECRET=your-payment-gateway-secret
```

### 4. Database Setup

```bash
# Start MongoDB service
mongod

# Seed the database with sample data (optional)
npm run seed
```

### 5. Start the Application

```bash
# Start backend server (runs on port 5000)
npm run server

# In a new terminal, start frontend (runs on port 3000)
npm run client

# Or start both concurrently
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

---

## 📁 Project Structure

```
dinesmart/
├── 📁 client/                    # React frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 pages/            # Page components
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📁 services/         # API service calls
│   │   ├── 📁 context/          # React context providers
│   │   ├── 📁 utils/            # Utility functions
│   │   ├── 📁 styles/           # CSS modules and global styles
│   │   └── 📁 assets/           # Images, icons, etc.
│   └── 📄 package.json
├── 📁 server/                   # Node.js backend
│   ├── 📁 controllers/          # Route controllers
│   ├── 📁 models/              # Mongoose schemas
│   ├── 📁 routes/              # Express routes
│   ├── 📁 middleware/          # Custom middleware
│   ├── 📁 services/            # Business logic services
│   ├── 📁 utils/               # Utility functions
│   ├── 📁 config/              # Configuration files
│   └── 📄 server.js            # Entry point
├── 📁 assets/                  # Project assets (screenshots, etc.)
├── 📄 README.md
├── 📄 package.json
└── 📄 .env.example
```

---

## 🔌 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register          # User registration
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

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm test -- --grep "Authentication"
```

### Test Coverage

Our comprehensive test suite covers:

- ✅ Authentication & Authorization
- ✅ API Endpoints
- ✅ Database Operations
- ✅ Frontend Components
- ✅ Integration Tests

---

## 🚀 Deployment

### Using Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create dinesmart-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_production_mongodb_uri
heroku config:set JWT_SECRET=your_production_jwt_secret

# Deploy
git push heroku main
```

### Using Docker

```dockerfile
# Dockerfile included in the project
docker build -t dinesmart .
docker run -p 5000:5000 dinesmart
```

### Environment Variables for Production

Ensure all environment variables are properly set in your production environment. Refer to `.env.example` for the complete list.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/yourusername.png" width="100px;" alt="Your Name"/><br>
        <sub><b>Your Name</b></sub><br>
        <sub>Full Stack Developer</sub>
      </td>
    </tr>
  </table>
</div>

---

## 📞 Support & Contact

- 📧 **Email**: support@dinesmart.com
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/dinesmart/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/dinesmart/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/dinesmart/wiki)

---

## 🙏 Acknowledgments

- Thanks to all contributors who helped make DineSmart possible
- Inspiration from modern food delivery platforms
- Open source community for amazing tools and libraries

---

<div align="center">
  <p>Made with ❤️ by the DineSmart Team</p>
  <p>
    <a href="#top">Back to Top ⬆️</a>
  </p>
</div>
