import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:9090/api/products';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Add this function to update the stock status of a product
export const updateProductStock = async (id: string, outOfStock: boolean): Promise<Product> => {
  const response = await axios.patch(`${API_URL}/${id}/stock`, null, {
    params: { outOfStock },
  });
  return response.data;
};