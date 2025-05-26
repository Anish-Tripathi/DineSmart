import React, { useState, useEffect } from 'react';


import FoodCard from '../../components/FoodCard/FoodCard';
import styles from './Home.module.css';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Array of hero images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=&w=1&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Delicious Pizza"
    },
    {
      url: "https://img.freepik.com/premium-photo/hot-cheesy-burger-fire-flames-smash-burger-with-fire-background-hot-cheesy-beef-burger-fire_742418-597.jpg",
      alt: "Juicy Burger"
    },
    {
      url: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Tasty Pasta"
    },
    {
      url: "https://wallpapercave.com/wp/wp10322969.jpg",
      alt: "Chicken Grills"
    },
    {
      url: "https://i.pinimg.com/originals/c0/24/a2/c024a2924f5ed369e798e35960afd12c.jpg",
      alt: "Veg Thali"
    },
    {
      url: "https://static3.depositphotos.com/1007955/233/i/600/depositphotos_2338169-stock-photo-chinese-food.jpg",
      alt: "Hakka Noodles"
    },
    {
      url: "https://www.archanaskitchen.com/images/archanaskitchen/0-Affiliate-Articles/RESTAURANT_STYLE_SOUTH_INDIAN_THALI_original.jpg",
      alt: "South Indian Thali"
    },
    {
      url: "https://img.freepik.com/premium-photo/diversified-desert-cakes-assorted-cream-snack-generate-ai_98402-83156.jpg",
      alt: "Cakes"
    }
  ];
  
  const loadFood = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
    
    if (response[1].length > 0) {
      setActiveCategory(response[1][0].CategoryName);
    }
  };

  const switchCategory = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Handle carousel rotation - Fixed to use heroImages.length instead of hardcoded 3
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(carouselInterval);
  }, [heroImages.length]);

  useEffect(() => {
    loadFood();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(`.${styles.hero}`);
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > 50) {
        heroSection?.classList.add(styles.scrolled);
      } else {
        heroSection?.classList.remove(styles.scrolled);
      }
      
      const carouselImages = document.querySelectorAll(`.${styles.heroImage}`);
      carouselImages.forEach(img => {
        const speed = 0.5;
        const yPos = -(scrollPosition * speed);
        img.style.transform = `scale(1.1) translateY(${yPos}px)`; 
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section with Carousel */}
      <section className={styles.hero}>
        <div className={styles.carousel}>
          {heroImages.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.heroCarouselItem} ${activeSlide === index ? styles.active : ''}`}
            >
              <img
                src={image.url}
                className={`${styles.heroImage}`}
                alt={image.alt}
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className={styles.searchBox}>
          <h1 className={styles.heroTitle}>Delicious Food, Delivered Fast</h1>
          
          <div className={styles.searchWrapper}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search for your favorite dish here!!"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className={`fa fa-search ${styles.searchIcon}`}></i>
          </div>
        </div>

      
      

        {/* Carousel Indicators */}
        <div className={styles.carouselIndicators}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselIndicator} ${activeSlide === index ? styles.active : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>
      
      {/* Category Navigation */}
      {foodCat.length > 0 && (
        <nav className={styles.categoryNav}>
          <div className="container">
            <div className={styles.tabsContainer}>
              <div className={styles.tabs}>
                {foodCat.map((category) => (
                  <button
                    key={category._id}
                    className={`${styles.tab} ${activeCategory === category.CategoryName ? styles.tabActive : ''}`}
                    onClick={() => switchCategory(category.CategoryName)}
                  >
                    {category.CategoryName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Food Categories and Items */}
      <div className={styles.foodContainer}>
        {foodCat.length > 0 ? (
          foodCat.map((category) => {
            if (category.CategoryName !== activeCategory) {
              return null;
            }
            
            const filteredItems = foodItems.filter(
              (item) => 
                item.CategoryName === category.CategoryName && 
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            
            return (
              <section 
                key={category._id} 
                className={`${styles.foodCategory} ${activeCategory === category.CategoryName ? styles.foodCategoryActive : ''}`}
              >
                <div className={styles.categoryHeader}>
                  <h2 className={styles.categoryTitle}>{category.CategoryName}</h2>
                  <div className={styles.categoryDivider}></div>
                </div>
                
                {filteredItems.length > 0 ? (
                  <div className={styles.foodGrid}>
                    {filteredItems.map(item => (
                      <div key={item._id} className={styles.foodItem}>
                        <FoodCard
                          foodItem={item}
                          options={item.options[0]}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noItems}>
                    <p>No {category.CategoryName} items found matching your search.</p>
                  </div>
                )}
              </section>
            );
          })
        ) : (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading our delicious menu...</p>
          </div>
        )}
      </div>
   
    </div>
  );
}