import { useState, useEffect, useRef } from "react";
import {
  Store,
  CheckCircle,
  MapPin,
  Clock,
  User,
  Tag,
  Trophy,
} from "lucide-react";
import styles from "./AddRestaurant.module.css";
import BasicInformationStep from "./BasicInformationStep";
import LocationStep from "./LocationStep";
import BusinessStep from "./BusinessStep";
import ContactStep from "./ContactStep";
import PromotionsStep from "./PromotionsStep";
import ReviewStep from "./ReviewStep";
import StepProgress from "./StepProgress";
import NavigationButtons from "./NavigationButtons";
import { toast } from "sonner";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const AddRestaurant = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const formTopRef = useRef(null);

  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    location: { type: "Point", coordinates: [0, 0] },
    image: "",
    cuisine: "",
    tags: [],
    deliveryTime: 30,
    rating: 4,
    priceRange: 2,
    isVeg: false,
    featured: false,
    contactInfo: {
      phone: "",
      email: "",
      hours: [""],
      manager: "",
      emergencyContact: "",
    },
    promotions: [],
    owner: "user123",
  });

  const [newPromotion, setNewPromotion] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 0,
    validFrom: new Date().toISOString().split("T")[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    isActive: true,
  });

  const steps = [
    {
      title: "Basic Information",
      icon: <CheckCircle size={20} />,
      component: BasicInformationStep,
    },
    {
      title: "Location Details",
      icon: <MapPin size={20} />,
      component: LocationStep,
    },
    {
      title: "Business Information",
      icon: <Clock size={20} />,
      component: BusinessStep,
    },
    {
      title: "Contact Information",
      icon: <User size={20} />,
      component: ContactStep,
    },
    {
      title: "Promotions",
      icon: <Tag size={20} />,
      component: PromotionsStep,
    },
    {
      title: "Tags & Review",
      icon: <Trophy size={20} />,
      component: ReviewStep,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      try {
        if (formTopRef.current) {
          formTopRef.current.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }

        console.log("Scrolled to form top with offset");
      } catch (error) {
        console.error("Scroll failed, using fallback:", error);

        // Fallback method
        formTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  // Handle restaurant input changes
  const handleRestaurantChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("contactInfo.")) {
      const field = name.split(".")[1];
      setRestaurant((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value,
        },
      }));
    } else if (name.includes("location.")) {
      const field = name.split(".")[1];
      setRestaurant((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [field]:
            field === "coordinates" ? value.split(",").map(Number) : value,
        },
      }));
    } else {
      setRestaurant((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle promotion input changes
  const handlePromotionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPromotion((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add promotion to restaurant
  const handleAddPromotion = () => {
    if (!newPromotion.code || !newPromotion.description) {
      toast.error("Promotion code and description are required");
      return;
    }

    // Format dates properly
    const formattedPromotion = {
      ...newPromotion,
      validFrom: new Date(newPromotion.validFrom),
      validUntil: new Date(newPromotion.validUntil),
      code: newPromotion.code.toUpperCase().trim(),
    };

    setRestaurant((prev) => ({
      ...prev,
      promotions: [...prev.promotions, formattedPromotion],
    }));

    // Reset form
    setNewPromotion({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 0,
      validFrom: new Date().toISOString().split("T")[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      isActive: true,
    });
  };

  // Remove promotion
  const handleRemovePromotion = (index) => {
    setRestaurant((prev) => ({
      ...prev,
      promotions: prev.promotions.filter((_, i) => i !== index),
    }));
  };

  // Handle restaurant submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${baseUrl}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurant),
      });

      if (!response.ok) {
        throw new Error("Failed to create restaurant");
      }

      const data = await response.json();

      localStorage.setItem("currentRestaurantId", data._id);

      toast.success("Restaurant created successfully!");
      console.log("Restaurant ID:", data._id);
    } catch (error) {
      toast.error(error.message);
      console.error("Error creating restaurant:", error);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.wrapper} ref={formTopRef}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Store size={32} className={styles.titleIcon} />
            Add Restaurant
          </h1>
          <p className={styles.subtitle}>
            Complete the steps below to add your restaurant
          </p>
        </div>

        {/* Progress Steps */}
        <StepProgress
          steps={steps}
          currentStep={currentStep}
          goToStep={goToStep}
        />

        {/* Form Content */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {steps[currentStep].icon}
              <span className={styles.formTitleText}>
                {steps[currentStep].title}
              </span>
            </h2>
          </div>
          <CurrentStepComponent
            restaurant={restaurant}
            setRestaurant={setRestaurant}
            handleRestaurantChange={handleRestaurantChange}
            newPromotion={newPromotion}
            setNewPromotion={setNewPromotion}
            handlePromotionChange={handlePromotionChange}
            handleAddPromotion={handleAddPromotion}
            handleRemovePromotion={handleRemovePromotion}
          />
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          steps={steps}
          setCurrentStep={setCurrentStep}
          handleSubmit={handleSubmit}
          scrollToFormTop={scrollToFormTop}
        />
      </div>
    </div>
  );
};

export default AddRestaurant;
