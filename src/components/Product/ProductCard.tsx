import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Laptop } from '../../types';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  laptop: Laptop;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ laptop, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(laptop);
    toast.success(`${laptop.name} added to cart!`, {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/product/${laptop.id}`} className="block">
        <div className="relative overflow-hidden">
          <motion.img
            src={laptop.image}
            alt={laptop.name}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {laptop.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
              Save ${laptop.originalPrice - laptop.price}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <motion.button
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {laptop.name}
            </h3>
            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
              {laptop.brand}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(laptop.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({laptop.reviews} reviews)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
            <div>CPU: {laptop.processor}</div>
            <div>RAM: {laptop.ram}</div>
            <div>Storage: {laptop.storage}</div>
            <div>GPU: {laptop.graphics}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${laptop.price.toLocaleString()}
              </span>
              {laptop.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${laptop.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;