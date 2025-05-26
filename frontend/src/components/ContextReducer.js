import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // If adding from a different restaurant, check if cart has items
      if (state.length > 0 && state[0].restaurantId !== action.restaurantId) {
        return [
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
            restaurantId: action.restaurantId,
            restaurantName: action.restaurantName,
          },
        ];
      }
      // Check if item already exists in cart
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.id && item.size === action.size
      );
      if (existingItemIndex >= 0) {
        // Item exists, update quantity and price
        let newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          qty: newState[existingItemIndex].qty + action.qty,
          price: newState[existingItemIndex].price + action.price,
        };
        return newState;
      } else {
        // New item, add to cart
        return [
          ...state,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
            restaurantId: action.restaurantId,
            restaurantName: action.restaurantName,
          },
        ];
      }

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

    case "DROP":
      return [];

    case "CHANGE_RESTAURANT":
      // Clear cart and add new item when restaurant changes
      return [
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
          restaurantId: action.restaurantId,
          restaurantName: action.restaurantName,
        },
      ];

    default:
      console.log("error in reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // 1. Initialize state from localStorage
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [state, dispatch] = useReducer(reducer, initialCart);

  // 2. Save state to localStorage on every update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
