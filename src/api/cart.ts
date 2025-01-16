'use server';
import { IExtendedProduct, IOrder, IVoucherData } from '@/interfaces/cart';
import { axiosInstance } from '@/utils/axiosInstanceServer';
export const addToCart = async (productSizeId: string, quantity: number) => {
  try {
    const response = await axiosInstance.post('/cart', {
      productSizeId,
      quantity,
    });
    if (response.status !== 200) {
      return null;
    }
    return response.data.success as boolean;
  } catch {
    return null;
  }
};

export const getCartSelf = async () => {
  try {
    const response = await axiosInstance.get('/cart/self');
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as IExtendedProduct[];
  } catch {
    return null;
  }
};

export const postAddCartItem = async (id: string, quantity: number) => {
  try {
    const body = { productSizeId: id, quantity: quantity };
    const response = await axiosInstance.post('/cart', body);
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as IExtendedProduct[];
  } catch {
    return null;
  }
};

export const getVoucher = async (code: string) => {
  try {
    const res = await axiosInstance.get(`/voucher/${code}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as IVoucherData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postOrder = async (order: IOrder) => {
  try {
    const res = await axiosInstance.post(`/order`, order);
    if (res.status !== 201) {
      return null;
    }
    return res.data.data as {
      amount: number;
      orderId: string;
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};
