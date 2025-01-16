'use server';
import { ExtendedWishList } from '@/interfaces/wishlist';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const addToWishList = async (pid: string) => {
  try {
    const response = await axiosInstance.post('/favorite', {
      productId: pid,
    });
    if (response.status !== 201) {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getWishList = async () => {
  try {
    const response = await axiosInstance.get('/favorite');
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as ExtendedWishList[];
  } catch {
    return null;
  }
};

export const removeWishList = async (id: string) => {
  try {
    const response = await axiosInstance.delete('/favorite/' + id);
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as ExtendedWishList[];
  } catch {
    return null;
  }
};
