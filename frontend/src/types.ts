export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    expirationDate?: string;
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface SortConfig {
    key: keyof Product;
    direction: 'asc' | 'desc';
  }
  
  export interface MetricsByCategory {
    totalProducts: number;
    totalValue: number;
    averagePrice: number;
  }
  
  export type Availability = 'all' | 'in_stock' | 'out_of_stock';
  
  export interface Metrics {
    [category: string]: MetricsByCategory;
    overall: MetricsByCategory;
  }