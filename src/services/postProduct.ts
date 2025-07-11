import type { Product } from '../types/productApp';
import axios from './axiosConfig';

export const addProduct = async (
  product: Omit<Product, 'id'>
): Promise<Product | void> => {
  try {
    const response = await axios.post<Product>('products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
