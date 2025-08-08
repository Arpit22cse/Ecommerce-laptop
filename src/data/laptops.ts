import { Laptop } from '../types';

export const laptops: Laptop[] = [
  {
    id: '1',
    name: 'MacBook Pro 16-inch M3 Max',
    brand: 'Apple',
    processor: 'Apple M3 Max',
    ram: '32GB',
    storage: '1TB SSD',
    graphics: 'Apple M3 Max GPU',
    display: '16.2" Liquid Retina XDR',
    price: 3499,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    reviews: 2847,
    description: 'The most powerful MacBook Pro ever built, featuring the revolutionary M3 Max chip with incredible performance for pro workflows.',
    features: [
      'Apple M3 Max chip with 16-core CPU',
      '40-core GPU for extreme graphics performance',
      '32GB unified memory',
      'Up to 22 hours battery life',
      'Liquid Retina XDR display',
      'Advanced camera and audio'
    ]
  },
  {
    id: '2',
    name: 'Dell XPS 15 OLED',
    brand: 'Dell',
    processor: 'Intel i9-13900H',
    ram: '32GB',
    storage: '1TB SSD',
    graphics: 'NVIDIA RTX 4070',
    display: '15.6" 4K OLED Touch',
    price: 2899,
    originalPrice: 3299,
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviews: 1923,
    description: 'Premium laptop with stunning 4K OLED display and powerful performance for creators and professionals.',
    features: [
      '13th Gen Intel Core i9 processor',
      'NVIDIA GeForce RTX 4070 GPU',
      '15.6" 4K OLED InfinityEdge touch display',
      'Premium aluminum construction',
      'Windows 11 Pro',
      'Thunderbolt 4 ports'
    ]
  },
  {
    id: '3',
    name: 'ThinkPad X1 Carbon Gen 11',
    brand: 'Lenovo',
    processor: 'Intel i7-1365U',
    ram: '16GB',
    storage: '512GB SSD',
    graphics: 'Intel Iris Xe',
    display: '14" 2.8K OLED',
    price: 1899,
    originalPrice: 2199,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviews: 1456,
    description: 'Ultra-lightweight business laptop with military-grade durability and exceptional battery life.',
    features: [
      '13th Gen Intel Core i7 processor',
      'Ultra-lightweight at 2.48 lbs',
      '14" 2.8K OLED display',
      'Up to 29.5 hours battery life',
      'MIL-STD-810H tested durability',
      'Rapid Charge technology'
    ]
  },
  {
    id: '4',
    name: 'ASUS ROG Strix Scar 17',
    brand: 'ASUS',
    processor: 'AMD Ryzen 9 7945HX',
    ram: '32GB',
    storage: '2TB SSD',
    graphics: 'NVIDIA RTX 4080',
    display: '17.3" 240Hz QHD',
    price: 2599,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 892,
    description: 'High-performance gaming laptop with cutting-edge AMD processor and NVIDIA RTX graphics.',
    features: [
      'AMD Ryzen 9 7945HX processor',
      'NVIDIA GeForce RTX 4080 GPU',
      '17.3" QHD 240Hz display',
      'Advanced cooling system',
      'Per-key RGB lighting',
      'Dolby Atmos audio'
    ]
  },
  {
    id: '5',
    name: 'Surface Laptop 5',
    brand: 'Microsoft',
    processor: 'Intel i7-1255U',
    ram: '16GB',
    storage: '512GB SSD',
    graphics: 'Intel Iris Xe',
    display: '13.5" PixelSense Touch',
    price: 1599,
    originalPrice: 1799,
    image: 'https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    reviews: 1247,
    description: 'Sleek and powerful laptop perfect for productivity and creativity with premium build quality.',
    features: [
      '12th Gen Intel Core i7 processor',
      '13.5" PixelSense touchscreen',
      'Premium Alcantara keyboard',
      'Windows 11 optimized',
      'All-day battery life',
      'Studio Mics for clear calls'
    ]
  },
  {
    id: '6',
    name: 'HP Spectre x360 16',
    brand: 'HP',
    processor: 'Intel i7-12700H',
    ram: '16GB',
    storage: '1TB SSD',
    graphics: 'Intel Arc A370M',
    display: '16" 3K+ OLED Touch',
    price: 1799,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.4,
    reviews: 756,
    description: '2-in-1 convertible laptop with stunning OLED display and versatile design for work and creativity.',
    features: [
      '12th Gen Intel Core i7 processor',
      '16" 3K+ OLED multitouch display',
      '360-degree convertible design',
      'Intel Arc A370M graphics',
      'Privacy camera with shutter',
      'Bang & Olufsen audio'
    ]
  }
];

export const getFilterOptions = (): { brands: string[], ram: string[], processors: string[] } => {
  const brands = [...new Set(laptops.map(laptop => laptop.brand))];
  const ram = [...new Set(laptops.map(laptop => laptop.ram))];
  const processors = [...new Set(laptops.map(laptop => laptop.processor))];
  
  return { brands, ram, processors };
};