import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Laptop, User, Order } from '../types';
import { laptops as initialLaptops } from '../data/laptops';
import { users as initialUsers, orders as initialOrders } from '../data/adminData';

interface AdminState {
  laptops: Laptop[];
  users: User[];
  orders: Order[];
}

type AdminAction = 
  | { type: 'ADD_LAPTOP'; laptop: Laptop }
  | { type: 'UPDATE_LAPTOP'; laptop: Laptop }
  | { type: 'DELETE_LAPTOP'; laptopId: string }
  | { type: 'UPDATE_USER_STATUS'; userId: string; status: 'active' | 'blocked' }
  | { type: 'DELETE_USER'; userId: string }
  | { type: 'UPDATE_ORDER_STATUS'; orderId: string; status: Order['status'] };

interface AdminContextType extends AdminState {
  addLaptop: (laptop: Laptop) => void;
  updateLaptop: (laptop: Laptop) => void;
  deleteLaptop: (laptopId: string) => void;
  updateUserStatus: (userId: string, status: 'active' | 'blocked') => void;
  deleteUser: (userId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'ADD_LAPTOP':
      return {
        ...state,
        laptops: [...state.laptops, action.laptop]
      };

    case 'UPDATE_LAPTOP':
      return {
        ...state,
        laptops: state.laptops.map(laptop =>
          laptop.id === action.laptop.id ? action.laptop : laptop
        )
      };

    case 'DELETE_LAPTOP':
      return {
        ...state,
        laptops: state.laptops.filter(laptop => laptop.id !== action.laptopId)
      };

    case 'UPDATE_USER_STATUS':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userId ? { ...user, status: action.status } : user
        )
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.userId)
      };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.orderId ? { ...order, status: action.status } : order
        )
      };

    default:
      return state;
  }
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    laptops: initialLaptops,
    users: initialUsers,
    orders: initialOrders
  });

  const addLaptop = (laptop: Laptop) => {
    dispatch({ type: 'ADD_LAPTOP', laptop });
  };

  const updateLaptop = (laptop: Laptop) => {
    dispatch({ type: 'UPDATE_LAPTOP', laptop });
  };

  const deleteLaptop = (laptopId: string) => {
    dispatch({ type: 'DELETE_LAPTOP', laptopId });
  };

  const updateUserStatus = (userId: string, status: 'active' | 'blocked') => {
    dispatch({ type: 'UPDATE_USER_STATUS', userId, status });
  };

  const deleteUser = (userId: string) => {
    dispatch({ type: 'DELETE_USER', userId });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', orderId, status });
  };

  const value: AdminContextType = {
    ...state,
    addLaptop,
    updateLaptop,
    deleteLaptop,
    updateUserStatus,
    deleteUser,
    updateOrderStatus
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};