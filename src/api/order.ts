'use server';
import { IExpressBody, IOrderList } from '@/interfaces/order';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getOrderInfo = async () => {
  try {
    const response = await axiosInstance.get('/order/self');
    if (response.status !== 200) {
      return false;
    }
    return response.data.data as IOrderList[];
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};

export const getOrderInfoById = async (orderid: string) => {
  try {
    const response = await axiosInstance.get(`/order/self/${orderid}`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data.data as IOrderList;
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};

export const updateOrderExpress = async (orderid: string, data: IExpressBody) => {
  try {
    const response = await axiosInstance.put(`/order/express/${orderid}`, data);
    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};
