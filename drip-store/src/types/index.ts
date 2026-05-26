export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: 'NEW' | 'BESTSELLER' | 'SALE';
  rating: number;
  reviews: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  tags: string[]; // para el grafo de relacionados
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}