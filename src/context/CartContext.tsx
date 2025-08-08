import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Laptop, CartContextType } from '../types';

type CartAction = 
  | { type: 'ADD_TO_CART'; laptop: Laptop }
  | { type: 'REMOVE_FROM_CART'; laptopId: string }
  | { type: 'UPDATE_QUANTITY'; laptopId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.laptop.id === action.laptop.id);
      if (existingItem) {
        return state.map(item =>
          item.laptop.id === action.laptop.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { laptop: action.laptop, quantity: 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.laptop.id !== action.laptopId);

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return state.filter(item => item.laptop.id !== action.laptopId);
      }
      return state.map(item =>
        item.laptop.id === action.laptopId
          ? { ...item, quantity: action.quantity }
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (laptop: Laptop) => {
    dispatch({ type: 'ADD_TO_CART', laptop });
  };

  const removeFromCart = (laptopId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', laptopId });
  };

  const updateQuantity = (laptopId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', laptopId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.laptop.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};