import { useState, useEffect } from "react";
import styles from "./RestaurantDashboard.module.css";
import {
  IndianRupee,
  ShoppingBag,
  UserPlus,
  Star,
  Utensils,
  Activity,
  MenuSquare,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  Store,
} from "lucide-react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [stats, setStats] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [activity, setActivity] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const currentRestaurantId = localStorage.getItem("currentRestaurantId");
        const token = localStorage.getItem("authToken");

        if (!currentRestaurantId || !token) {
          throw new Error("Authentication required");
        }

        if (!currentRestaurantId) {
          throw new Error("No restaurant ID found in localStorage");
        }

        const restaurantRes = await fetch(
          `${baseUrl}/api/restaurants/${currentRestaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!restaurantRes.ok) throw new Error("Failed to fetch restaurant");
        const restaurantData = await restaurantRes.json();
        setRestaurant(restaurantData);

        const bookingsRes = await fetch(
          `${baseUrl}/api/bookings/restaurant/${currentRestaurantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");
        const bookingsData = await bookingsRes.json();

        // Calculate stats
        const today = new Date().toISOString().split("T")[0];
        const todayBookings = bookingsData.filter(
          (booking) => booking.date.split("T")[0] === today
        );

        const calculatedStats = [
          {
            label: "Today's Revenue",
            value: `₹${Math.floor(Math.random() * 50000) + 5000}`,
            icon: <IndianRupee size={32} color="#1FAA59" />,
            change: `${Math.floor(Math.random() * 20) + 5}% from yesterday`,
            changeColor: styles.success,
          },
          {
            label: "Total Orders",
            value: todayBookings.length,
            icon: <ShoppingBag size={32} color="#3A86FF" />,
            change: `${Math.floor(Math.random() * 10) + 2}% from yesterday`,
            changeColor: styles.info,
          },
          {
            label: "New Customers",
            value: Math.floor(Math.random() * 10) + 5,
            icon: <UserPlus size={32} color="#A259FF" />,
            change: "Today",
            changeColor: styles.purple,
          },
          {
            label: "Avg Rating",
            value: (Math.random() * 1 + 4).toFixed(1),
            icon: <Star size={32} color="#FFD600" fill="#FFD600" />,
            change: `${Math.random() > 0.5 ? "+" : "-"}${(
              Math.random() * 0.3
            ).toFixed(1)} this week`,
            changeColor: styles.warning,
          },
        ];
        setStats(calculatedStats);

        // Sample popular items
        const samplePopularItems = [
          {
            name: "Butter Chicken",
            orders: Math.floor(Math.random() * 100) + 50,
            revenue: `₹${Math.floor(Math.random() * 20000) + 5000}`,
          },
          {
            name: "Biryani",
            orders: Math.floor(Math.random() * 80) + 40,
            revenue: `₹${Math.floor(Math.random() * 15000) + 4000}`,
          },
          {
            name: "Paneer Tikka",
            orders: Math.floor(Math.random() * 60) + 30,
            revenue: `₹${Math.floor(Math.random() * 10000) + 3000}`,
          },
        ];
        setPopularItems(samplePopularItems);

        // Sample recent activity
        const sampleActivity = [
          {
            text: `New order received - Table ${
              Math.floor(Math.random() * 10) + 1
            }`,
            icon: <span className={styles.dotSuccess} />,
            time: `${Math.floor(Math.random() * 10) + 1}m ago`,
          },
          {
            text: `Order #${Math.floor(Math.random() * 1000) + 1000} completed`,
            icon: <span className={styles.dotInfo} />,
            time: `${Math.floor(Math.random() * 20) + 5}m ago`,
          },
          {
            text: "New review - 5 stars",
            icon: <span className={styles.dotWarning} />,
            time: `${Math.floor(Math.random() * 60) + 15}m ago`,
          },
        ];
        setActivity(sampleActivity);

        const sampleReviews = [
          {
            stars: 5.0,
            name: ["Rahul", "Priya", "Amit", "Neha", "Vikram"][
              Math.floor(Math.random() * 5)
            ],
            date: "2 hours ago",
            text: "Amazing food and authentic flavors! Will definitely come back.",
          },
          {
            stars: 4.5,
            name: ["Anjali", "Rohan", "Deepak", "Meera", "Karan"][
              Math.floor(Math.random() * 5)
            ],
            date: "5 hours ago",
            text: "Great service and delicious food. The ambiance was perfect.",
          },
          {
            stars: 4.0,
            name: ["Sanjay", "Divya", "Arjun", "Pooja", "Raj"][
              Math.floor(Math.random() * 5)
            ],
            date: "1 day ago",
            text: "Enjoyed our family dinner. The biryani was particularly good.",
          },
        ];
        setReviews(sampleReviews);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  if (loading) {
    return <div className={styles.container}>Loading dashboard...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div className={styles.container}>No restaurant data found</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.backgroundOverlay}></div>
      <header className={styles.header}>
        <div className={styles.infoSection}>
          <h1 className={styles.restaurantName}>{restaurant.name}</h1>
          <div className={styles.restaurantDetails}>
            <span>{restaurant.cuisine}</span>
            <span className={styles.dot}>•</span>
            <span>{restaurant.address || "Address not specified"}</span>
            <span className={styles.dot}>•</span>
            <span>{restaurant.contactInfo.phone || "Phone not specified"}</span>
          </div>

          <nav className={styles.quickLinks}>
            <a href="/my-restaurant" className={styles.link}>
              <Store size={18} /> Manage Restaurant <ChevronRight size={16} />
            </a>
            <a href="/manage-menu" className={styles.link}>
              <MenuSquare size={18} /> Manage Menu <ChevronRight size={16} />
            </a>
            <a href="/manage-order" className={styles.link}>
              <BookOpen size={18} /> Orders <ChevronRight size={16} />
            </a>
            <a href="/manage-booking" className={styles.link}>
              <CalendarCheck size={18} /> Bookings <ChevronRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <section className={styles.stats}>
        {stats.map((stat, idx) => (
          <div className={styles.statCard} key={stat.label}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={stat.changeColor}>{stat.change}</span>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.grid}>
        <div className={styles.box}>
          <h2 className={styles.boxTitle}>
            <Utensils size={20} /> Popular Items
          </h2>
          <ul className={styles.popularList}>
            {popularItems.map((item) => (
              <li key={item.name} className={styles.popularItem}>
                <div>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemOrders}>
                    {item.orders} orders
                  </span>
                </div>
                <span className={styles.itemRevenue}>{item.revenue}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.box}>
          <h2 className={styles.boxTitle}>
            <Activity size={20} /> Real-time Activity
          </h2>
          <ul className={styles.activityList}>
            {activity.map((act, idx) => (
              <li key={idx} className={styles.activityItem}>
                <span className={styles.activityIcon}>{act.icon}</span>
                <span className={styles.activityText}>{act.text}</span>
                <span className={styles.activityTime}>{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Ratings & Reviews */}
      <section className={styles.reviewsSection}>
        <div className={styles.boxFull}>
          <h2 className={styles.boxTitle}>
            <Star size={20} /> Recent Reviews
          </h2>
          <div className={styles.reviewsList}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewStars}>
                    <Star size={16} color="#FFD600" fill="#FFD600" />{" "}
                    {review.stars}
                  </span>
                  <span className={styles.reviewerName}>by {review.name}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.reviewText}>{review.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDashboard;
