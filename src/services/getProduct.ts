import type { Product } from '../types/productApp';
import axios from './axiosConfig';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>('products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
