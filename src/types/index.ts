export interface Laptop {
  id: string;
  name: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
  display: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (laptop: Laptop) => void;
  removeFromCart: (laptopId: string) => void;
  updateQuantity: (laptopId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface FilterOptions {
  brands: string[];
  ram: string[];
  processors: string[];
}