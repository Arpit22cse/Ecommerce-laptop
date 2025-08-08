import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { laptops, getFilterOptions } from '../data/laptops';

const ProductListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = getFilterOptions();

  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const matchesSearch = laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.processor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(laptop.brand);
      const matchesRam = selectedRam.length === 0 || selectedRam.includes(laptop.ram);
      const matchesProcessor = selectedProcessors.length === 0 || 
                              selectedProcessors.some(proc => laptop.processor.includes(proc));
      const matchesPrice = laptop.price >= priceRange[0] && laptop.price <= priceRange[1];

      return matchesSearch && matchesBrand && matchesRam && matchesProcessor && matchesPrice;
    });
  }, [searchTerm, selectedBrands, selectedRam, selectedProcessors, priceRange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRamChange = (ram: string) => {
    setSelectedRam(prev => 
      prev.includes(ram) 
        ? prev.filter(r => r !== ram)
        : [...prev, ram]
    );
  };

  const handleProcessorChange = (processor: string) => {
    setSelectedProcessors(prev => 
      prev.includes(processor) 
        ? prev.filter(p => p !== processor)
        : [...prev, processor]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedRam([]);
    setSelectedProcessors([]);
    setPriceRange([0, 5000]);
    setSearchTerm('');
  };

  const activeFiltersCount = selectedBrands.length + selectedRam.length + selectedProcessors.length + 
                            (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Laptops
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium laptops
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredLaptops.length} of {laptops.length} products
              </span>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="lg:block fixed lg:relative top-0 left-0 w-80 lg:w-64 h-screen lg:h-auto bg-white lg:bg-transparent shadow-xl lg:shadow-none z-40 lg:z-auto"
              >
                <div className="p-6 lg:p-0">
                  {/* Mobile Filter Header */}
                  <div className="lg:hidden flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="bg-white lg:bg-gray-50 rounded-lg p-6 space-y-6">
                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Filters</span>
                        <button
                          onClick={clearFilters}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Clear All
                        </button>
                      </div>
                    )}

                    {/* Brand Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                      <div className="space-y-2">
                        {filterOptions.brands.map((brand) => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => handleBrandChange(brand)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* RAM Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">RAM</h3>
                      <div className="space-y-2">
                        {filterOptions.ram.map((ram) => (
                          <label key={ram} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedRam.includes(ram)}
                              onChange={() => handleRamChange(ram)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{ram}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Processor Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Processor</h3>
                      <div className="space-y-2">
                        {['Intel', 'AMD', 'Apple M'].map((processor) => (
                          <label key={processor} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedProcessors.includes(processor)}
                              onChange={() => handleProcessorChange(processor)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{processor}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="5000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>$0</span>
                          <span className="font-medium">
                            Up to ${priceRange[1].toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredLaptops.map((laptop, index) => (
                  <motion.div
                    key={laptop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard laptop={laptop} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredLaptops.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No laptops found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductListing;