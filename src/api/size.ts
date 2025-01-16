'use server';
import { ISize } from '@/interfaces/size';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getAllSize = async () => {
  try {
    const response = await axiosInstance.get('/size');
    if (response.status !== 200) {
      throw new Error('An error occurred while fetching data');
    }

    return response.data.data as ISize[];
  } catch {
    return [];
  }
};
