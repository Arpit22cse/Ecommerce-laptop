import { User, Order, DashboardStats } from '../types';
import { laptops } from './laptops';

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-01-15',
    totalOrders: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-02-20',
    totalOrders: 3
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    role: 'customer',
    status: 'active',
    joinDate: '2024-03-10',
    totalOrders: 8
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    role: 'customer',
    status: 'blocked',
    joinDate: '2024-01-05',
    totalOrders: 2
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@laptopshop.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-12-01',
    totalOrders: 0
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@email.com',
    items: [
      {
        laptop: laptops[0],
        quantity: 1
      }
    ],
    total: 3499,
    status: 'delivered',
    orderDate: '2024-12-01',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-002',
    userId: '2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@email.com',
    items: [
      {
        laptop: laptops[1],
        quantity: 1
      },
      {
        laptop: laptops[4],
        quantity: 1
      }
    ],
    total: 4498,
    status: 'shipped',
    orderDate: '2024-12-15',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: 'ORD-003',
    userId: '3',
    userName: 'Mike Chen',
    userEmail: 'mike.chen@email.com',
    items: [
      {
        laptop: laptops[2],
        quantity: 2
      }
    ],
    total: 3798,
    status: 'processing',
    orderDate: '2024-12-20',
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-004',
    userId: '1',
    userName: 'John Smith',
    userEmail: 'john.smith@email.com',
    items: [
      {
        laptop: laptops[3],
        quantity: 1
      }
    ],
    total: 2599,
    status: 'pending',
    orderDate: '2024-12-22',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-005',
    userId: '4',
    userName: 'Emily Davis',
    userEmail: 'emily.davis@email.com',
    items: [
      {
        laptop: laptops[5],
        quantity: 1
      }
    ],
    total: 1799,
    status: 'cancelled',
    orderDate: '2024-12-18',
    shippingAddress: '321 Elm St, Miami, FL 33101'
  }
];

export const dashboardStats: DashboardStats = {
  totalSales: 16093,
  totalOrders: 5,
  totalProducts: laptops.length,
  totalUsers: users.filter(u => u.role === 'customer').length,
  recentOrders: orders.slice(0, 3),
  salesGrowth: 12.5,
  ordersGrowth: 8.3
};