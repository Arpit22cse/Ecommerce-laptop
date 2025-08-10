import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import ProductModal from '../../components/Admin/ProductModal';
import { Laptop } from '../../types';
import toast from 'react-hot-toast';
import { adminApi } from '../../types/api';

const AdminProducts: React.FC = () => {
  const { laptops, addLaptop, updateLaptop, deleteLaptop } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredLaptops = laptops.filter(laptop => {
    const matchesSearch = laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         laptop.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === '' || laptop.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const brands = [...new Set(laptops.map(laptop => laptop.brand))];

  const handleAddProduct = () => {
    setSelectedLaptop(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditProduct = (laptop: Laptop) => {
    setSelectedLaptop(laptop);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (laptopId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteLaptop(laptopId);
      toast.success('Product deleted successfully!');
    }
  };

    const handleSaveProduct = (laptop: Laptop, images?: File[]) => {
        if (modalMode === 'add') {
            addLaptop(laptop);
            adminApi.addLaptop(laptop, images)
                .then(response => {
                    if (!response.error) {
                        toast.success('Product added successfully!');
                    } else {
                        toast.error(response.message || 'Failed to add product');
                    }
                })
                .catch(error => {
                    console.error('Error adding product:', error);
                    toast.error('Failed to add product');
                });
        } else {
            updateLaptop(laptop);
            toast.success('Product updated successfully!');
        }
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <motion.button
            onClick={handleAddProduct}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4 sm:mt-0"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              {filteredLaptops.length} of {laptops.length} products
            </div>
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specs
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredLaptops.map((laptop, index) => (
                    <motion.tr
                      key={laptop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={laptop.image}
                            alt={laptop.name}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {laptop.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {laptop.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {laptop.brand}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="space-y-1">
                          <div>{laptop.processor}</div>
                          <div className="text-gray-500">{laptop.ram} • {laptop.storage}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${laptop.price.toLocaleString()}
                        </div>
                        {laptop.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${laptop.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 mr-1">
                            {laptop.rating}
                          </span>
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({laptop.reviews})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            onClick={() => handleEditProduct(laptop)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-all duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteProduct(laptop.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredLaptops.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedBrand 
                  ? 'Try adjusting your search filters'
                  : 'Get started by adding your first product'
                }
              </p>
              {!searchTerm && !selectedBrand && (
                <button
                  onClick={handleAddProduct}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first product
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          laptop={selectedLaptop}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default AdminProducts;