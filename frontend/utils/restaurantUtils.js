// utils/restaurantUtils.js

// Helper function to calculate distance between two coordinates in miles
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + 
             Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515; // Convert to miles
  return dist;
};

// Main filter function
export const filterRestaurants = (restaurants, filters) => {
  let filtered = [...restaurants];
  
  // Filter by location if user location is available
  if (filters.userLocation) {
    filtered = filtered.filter(restaurant => {
      if (!restaurant.location?.coordinates) return false;
      const distance = calculateDistance(
        filters.userLocation.lat,
        filters.userLocation.lng,
        restaurant.location.coordinates[1], // latitude
        restaurant.location.coordinates[0]  // longitude
      );
      return distance <= filters.distance;
    });
  }
  
  // Filter by price range
  filtered = filtered.filter(restaurant => {
    const price = parseFloat(restaurant.priceRange.replace('$', '').split('-')[0]);
    return price >= filters.priceRange.min && price <= filters.priceRange.max;
  });
  
  // Filter by delivery time
  const maxDeliveryTime = parseInt(filters.deliveryTime);
  filtered = filtered.filter(restaurant => {
    const restaurantDeliveryTime = parseInt(restaurant.deliveryTime);
    return restaurantDeliveryTime <= maxDeliveryTime;
  });
  
  // Filter by rating
  const minRating = parseFloat(filters.rating);
  filtered = filtered.filter(restaurant => restaurant.rating >= minRating);
  
  // Filter by cuisine
  if (filters.cuisine) {
    filtered = filtered.filter(restaurant => 
      restaurant.cuisine.toLowerCase() === filters.cuisine.toLowerCase()
    );
  }
  
  // Filter by vegetarian
  if (filters.vegetarianOnly) {
    filtered = filtered.filter(restaurant => restaurant.isVeg);
  }
  
  // Sort results
  switch (filters.sortBy) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'delivery_time':
      filtered.sort((a, b) => a.deliveryTime - b.deliveryTime);
      break;
    case 'price_low':
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.priceRange.replace('$', '').split('-')[0]);
        const priceB = parseFloat(b.priceRange.replace('$', '').split('-')[0]);
        return priceA - priceB;
      });
      break;
    case 'price_high':
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.priceRange.replace('$', '').split('-')[0]);
        const priceB = parseFloat(b.priceRange.replace('$', '').split('-')[0]);
        return priceB - priceA;
      });
      break;
    default:
      // Default sorting (maybe by relevance or popularity)
      break;
  }
  
  return filtered;
};