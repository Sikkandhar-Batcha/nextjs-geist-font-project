// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

// Order Types
export interface OrderItem {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: 'marriage' | 'reception' | 'other';
  eventDate: Date;
  guestCount: number;
  items: OrderItem[];
  totalAmount: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Raw Product Types
export interface RawProduct {
  id: string;
  name: string;
  category: string;
  unit: string;
  costPerUnit: number;
  currentStock: number;
  minimumStock: number;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Purchase Types
export interface Purchase {
  id: string;
  rawProductId: string;
  rawProductName: string;
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  supplier: string;
  purchaseDate: Date;
  createdAt: Date;
}

// Sales Types
export interface Sale {
  id: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  saleDate: Date;
  createdAt: Date;
}

// Report Types
export interface DailySalesReport {
  date: string;
  totalSales: number;
  totalOrders: number;
  topSellingItems: {
    itemName: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface MonthlySalesReport {
  month: string;
  year: number;
  totalSales: number;
  totalOrders: number;
  dailyBreakdown: DailySalesReport[];
}

export interface ProfitLossReport {
  period: string;
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
}

// Admin Types
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form Types
export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: 'marriage' | 'reception' | 'other';
  eventDate: string;
  guestCount: number;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  specialRequests?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface RawProductFormData {
  name: string;
  category: string;
  unit: string;
  costPerUnit: number;
  currentStock: number;
  minimumStock: number;
  supplier?: string;
}

// Chart Data Types
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}
