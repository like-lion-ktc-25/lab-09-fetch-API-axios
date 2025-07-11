import type { Product } from '../types/productApp';
import axios from './axiosConfig';

export const updateProduct = async (
  product: Product
): Promise<Product | void> => {
  try {
    const response = await axios.put<Product>(`products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};
