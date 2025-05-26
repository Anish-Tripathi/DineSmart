import {
  Utensils,
  Salad,
  Wheat,
  Star,
  Sparkles,
  Egg,
  Soup,
  Beer,
  CakeSlice,
  Sandwich,
  Croissant,
  Layers3,
} from "lucide-react";

export const categories = [
  { key: "starters", label: "Starters", icon: <Egg size={16} /> },
  { key: "appetizer", label: "Appetizer", icon: <Salad size={16} /> },
  { key: "snack", label: "Snack", icon: <Sandwich size={16} /> },
  { key: "breads", label: "Breads", icon: <Wheat size={16} /> },
  { key: "main course", label: "Main Course", icon: <Utensils size={16} /> },
  { key: "desserts", label: "Desserts", icon: <CakeSlice size={16} /> },
  { key: "beverages", label: "Beverages", icon: <Beer size={16} /> },
  { key: "sides", label: "Sides", icon: <Layers3 size={16} /> },
  { key: "specials", label: "Specials", icon: <Sparkles size={16} /> },
  { key: "thali", label: "Thali", icon: <Star size={16} /> },
  { key: "breakfast", label: "Breakfast", icon: <Croissant size={16} /> },
  { key: "soup", label: "Soup", icon: <Soup size={16} /> },
];

export const initialMenuItem = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "main course",
  isVeg: false,
  isSpicy: false,
  isGlutenFree: false,
  ingredients: [""],
  nutritionInfo: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  allergenInfo: [""],
  popular: false,
};
