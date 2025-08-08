import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.laptop.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.laptop.id);
    toast.success(`${item.laptop.name} removed from cart`, {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.laptop.image}
            alt={item.laptop.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.laptop.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Brand: {item.laptop.brand}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
            <span>{item.laptop.processor}</span>
            <span>•</span>
            <span>{item.laptop.ram}</span>
            <span>•</span>
            <span>{item.laptop.storage}</span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <Minus className="h-4 w-4" />
          </motion.button>
          
          <span className="w-12 text-center font-medium">{item.quantity}</span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Price and Remove */}
        <div className="flex flex-col items-end space-y-2">
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ${(item.laptop.price * item.quantity).toLocaleString()}
            </div>
            {item.quantity > 1 && (
              <div className="text-sm text-gray-600">
                ${item.laptop.price.toLocaleString()} each
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemove}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;