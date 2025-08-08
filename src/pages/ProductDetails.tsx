import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Check, Cpu, HardDrive, Monitor } from 'lucide-react';
import { laptops } from '../data/laptops';
import { useCart } from '../context/CartContext';
import ImageGallery from '../components/Product/ImageGallery';
import toast from 'react-hot-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const laptop = laptops.find(l => l.id === id);

  if (!laptop) {
    return <Navigate to="/products" replace />;
  }

  const handleAddToCart = () => {
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
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const specs = [
    { icon: Cpu, label: 'Processor', value: laptop.processor },
    { icon: HardDrive, label: 'RAM', value: laptop.ram },
    { icon: HardDrive, label: 'Storage', value: laptop.storage },
    { icon: Monitor, label: 'Display', value: laptop.display },
    { icon: Cpu, label: 'Graphics', value: laptop.graphics }
  ];

  const reviews = [
    {
      name: 'John Smith',
      rating: 5,
      comment: 'Excellent laptop with amazing performance. Highly recommended!',
      date: '2 weeks ago'
    },
    {
      name: 'Sarah Johnson',
      rating: 4,
      comment: 'Great build quality and fast shipping. Very satisfied with my purchase.',
      date: '1 month ago'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'Perfect for gaming and work. The display quality is outstanding.',
      date: '3 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={laptop.images} productName={laptop.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand and Name */}
              <div>
                <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                  {laptop.brand}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">
                  {laptop.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(laptop.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {laptop.rating} ({laptop.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${laptop.price.toLocaleString()}
                </span>
                {laptop.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${laptop.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save ${laptop.originalPrice - laptop.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {laptop.description}
              </p>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {laptop.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
                >
                  <Heart className="h-5 w-5 text-gray-600" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  <spec.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{spec.label}</h3>
                  <p className="text-gray-600 text-sm">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{review.name}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;