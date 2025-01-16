'use server';

import { IDashBoard, ISeller, ISellerOrder, NewUser } from '@/interfaces/seller';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const isSeller = async (sellerId: string): Promise<ISeller | boolean> => {
  try {
    const response = await axiosInstance.get(`/seller/permission/${sellerId}`);
    if (response.status !== 200) {
      throw new Error('Error');
    }
    return response.data.data as ISeller;
  } catch {
    return false;
  }
};

export const getSellerByOwner = async () => {
  try {
    const res = await axiosInstance.get('/seller/owner');
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as ISeller[];
  } catch {
    return null;
  }
};

export const getOrderHistory = async (seller_id: string) => {
  try {
    const res = await axiosInstance.get(`/order/seller/${seller_id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as ISellerOrder[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postSeller = async (data: NewUser) => {
  try {
    const res = await axiosInstance.post('/seller', data);
    if (res.status !== 200 && res.status !== 201) {
      return null;
    }
    return res.data.success as boolean;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDashBoard = async (seller_id: string) => {
  try {
    const res = await axiosInstance.get(`/seller/dashboard/${seller_id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as IDashBoard;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const patchUpdateSeller = async (data: ISeller) => {
  try {
    const res = await axiosInstance.patch('/seller', data);
    if (res.status !== 200) {
      return null;
    }
    return res.data.success as boolean;
  } catch (err) {
    console.log(err);
    return null;
  }
};
