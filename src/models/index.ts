export interface Category {
  id: number;
  title: string;
}

export interface Product {
  id: number;
  title: string;
  sku?: string;
  manufacturer?: string;
  color?: string;
  material?: string;
  season?: string;
  reason?: string;
  sizes: { size: string; avalible: boolean }[];
  images: string[];
  price: number;
}

export interface OrderItem {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
}

export interface Order {
  owner: { phone: string; address: string };
  items: OrderItem[];
}
