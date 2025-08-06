import axios, { type AxiosResponse } from 'axios';
import type {
  MenuItem,
  Order,
  RawProduct,
  Purchase,
  Sale,
  Admin,
  LoginCredentials,
  AuthResponse,
  OrderFormData,
  ProductFormData,
  RawProductFormData,
  ApiResponse,
  DailySalesReport,
  MonthlySalesReport,
  ProfitLossReport,
} from '../types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminData');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post('/auth/login', credentials);
    return response.data.data!;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminData');
  },

  verifyToken: async (): Promise<Admin> => {
    const response: AxiosResponse<ApiResponse<Admin>> = await api.get('/auth/verify');
    return response.data.data!;
  },
};

// Menu Items API
export const menuAPI = {
  getAll: async (): Promise<MenuItem[]> => {
    const response: AxiosResponse<ApiResponse<MenuItem[]>> = await api.get('/menu');
    return response.data.data!;
  },

  getById: async (id: string): Promise<MenuItem> => {
    const response: AxiosResponse<ApiResponse<MenuItem>> = await api.get(`/menu/${id}`);
    return response.data.data!;
  },

  create: async (data: ProductFormData): Promise<MenuItem> => {
    const response: AxiosResponse<ApiResponse<MenuItem>> = await api.post('/menu', data);
    return response.data.data!;
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<MenuItem> => {
    const response: AxiosResponse<ApiResponse<MenuItem>> = await api.put(`/menu/${id}`, data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/menu/${id}`);
  },

  getCategories: async (): Promise<string[]> => {
    const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/menu/categories');
    return response.data.data!;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async (): Promise<Order[]> => {
    const response: AxiosResponse<ApiResponse<Order[]>> = await api.get('/orders');
    return response.data.data!;
  },

  getById: async (id: string): Promise<Order> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.get(`/orders/${id}`);
    return response.data.data!;
  },

  create: async (data: OrderFormData): Promise<Order> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.post('/orders', data);
    return response.data.data!;
  },

  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response: AxiosResponse<ApiResponse<Order>> = await api.patch(`/orders/${id}/status`, { status });
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },
};

// Raw Products API
export const rawProductsAPI = {
  getAll: async (): Promise<RawProduct[]> => {
    const response: AxiosResponse<ApiResponse<RawProduct[]>> = await api.get('/raw-products');
    return response.data.data!;
  },

  getById: async (id: string): Promise<RawProduct> => {
    const response: AxiosResponse<ApiResponse<RawProduct>> = await api.get(`/raw-products/${id}`);
    return response.data.data!;
  },

  create: async (data: RawProductFormData): Promise<RawProduct> => {
    const response: AxiosResponse<ApiResponse<RawProduct>> = await api.post('/raw-products', data);
    return response.data.data!;
  },

  update: async (id: string, data: Partial<RawProductFormData>): Promise<RawProduct> => {
    const response: AxiosResponse<ApiResponse<RawProduct>> = await api.put(`/raw-products/${id}`, data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/raw-products/${id}`);
  },

  updateStock: async (id: string, quantity: number, type: 'add' | 'subtract'): Promise<RawProduct> => {
    const response: AxiosResponse<ApiResponse<RawProduct>> = await api.patch(`/raw-products/${id}/stock`, {
      quantity,
      type,
    });
    return response.data.data!;
  },
};

// Purchases API
export const purchasesAPI = {
  getAll: async (): Promise<Purchase[]> => {
    const response: AxiosResponse<ApiResponse<Purchase[]>> = await api.get('/purchases');
    return response.data.data!;
  },

  create: async (data: {
    rawProductId: string;
    quantity: number;
    costPerUnit: number;
    supplier: string;
  }): Promise<Purchase> => {
    const response: AxiosResponse<ApiResponse<Purchase>> = await api.post('/purchases', data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/purchases/${id}`);
  },
};

// Sales API
export const salesAPI = {
  getAll: async (): Promise<Sale[]> => {
    const response: AxiosResponse<ApiResponse<Sale[]>> = await api.get('/sales');
    return response.data.data!;
  },

  getByDateRange: async (startDate: string, endDate: string): Promise<Sale[]> => {
    const response: AxiosResponse<ApiResponse<Sale[]>> = await api.get('/sales', {
      params: { startDate, endDate },
    });
    return response.data.data!;
  },
};

// Reports API
export const reportsAPI = {
  getDailySales: async (date: string): Promise<DailySalesReport> => {
    const response: AxiosResponse<ApiResponse<DailySalesReport>> = await api.get(`/reports/daily-sales`, {
      params: { date },
    });
    return response.data.data!;
  },

  getMonthlySales: async (month: number, year: number): Promise<MonthlySalesReport> => {
    const response: AxiosResponse<ApiResponse<MonthlySalesReport>> = await api.get(`/reports/monthly-sales`, {
      params: { month, year },
    });
    return response.data.data!;
  },

  getProfitLoss: async (startDate: string, endDate: string): Promise<ProfitLossReport> => {
    const response: AxiosResponse<ApiResponse<ProfitLossReport>> = await api.get(`/reports/profit-loss`, {
      params: { startDate, endDate },
    });
    return response.data.data!;
  },

  getTopSellingItems: async (period: 'daily' | 'weekly' | 'monthly'): Promise<{
    itemName: string;
    quantity: number;
    revenue: number;
  }[]> => {
    const response: AxiosResponse<ApiResponse<{
      itemName: string;
      quantity: number;
      revenue: number;
    }[]>> = await api.get(`/reports/top-selling`, {
      params: { period },
    });
    return response.data.data!;
  },

  getSalesChart: async (period: 'daily' | 'weekly' | 'monthly'): Promise<{
    labels: string[];
    data: number[];
  }> => {
    const response: AxiosResponse<ApiResponse<{
      labels: string[];
      data: number[];
    }>> = await api.get(`/reports/sales-chart`, {
      params: { period },
    });
    return response.data.data!;
  },
};

export default api;
