import { useState, useRef, useEffect } from "react";
import styles from "./RestaurantList.module.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

const RestaurantList = ({ restaurants, onViewMenu }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantListRef = useRef(null);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(restaurants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRestaurants = restaurants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const scrollToRestaurantList = () => {
    if (restaurantListRef.current) {
      restaurantListRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  };

  // Handle pagination with scroll
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Small delay to ensure state update, then scroll
      setTimeout(scrollToRestaurantList, 100);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Small delay to ensure state update, then scroll
      setTimeout(scrollToRestaurantList, 100);
    }
  };

  // Reset to page 1 when restaurants change
  useEffect(() => {
    setCurrentPage(1);
  }, [restaurants]);

  return (
    <div ref={restaurantListRef} className={styles.restaurantListContainer}>
      {currentRestaurants.length > 0 ? (
        <>
          <div className={styles.restaurantGrid}>
            {currentRestaurants.map((restaurant) => (
              <div key={restaurant._id} className={styles.restaurantItem}>
                <RestaurantCard
                  restaurant={restaurant}
                  onViewMenu={onViewMenu}
                />
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div className={styles.noResults}>
          No restaurants found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
