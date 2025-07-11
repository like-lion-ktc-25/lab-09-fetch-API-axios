import axios from './axiosConfig';

export const deleteProduct = async (
  id: string
): Promise<void> => {
  try {
    await axios.delete(`products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
