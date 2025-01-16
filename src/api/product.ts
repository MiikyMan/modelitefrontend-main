'use server';
import { Filters, ICreateProduct, IProduct } from '@/interfaces/product';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getProduct = async (filter?: Filters) => {
  try {
    // Change filter to array with only checked value
    let filterArray: { name: string; value: string[] }[] = [];
    if (filter) {
      filterArray = Object.keys(filter)
        .map((key) => {
          return {
            name: key,
            value: filter[key].value.filter((item) => item.checked).map((item) => item.label),
          };
        })
        .filter((item) => item.value.length > 0);
    }
    const response = await axiosInstance.post('/product', { filter: filterArray ?? [] });
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as IProduct[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProductBySeller = async (sellerId: string) => {
  try {
    const response = await axiosInstance.get(`/product/seller/${sellerId}`);
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as IProduct[];
  } catch {
    return null;
  }
};

export async function GetProductById(pid: string) {
  try {
    const res = await axiosInstance.get(`/product/${pid}`);
    return res.data.data as IProduct;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export async function CreateProductAPI(body: ICreateProduct) {
  try {
    const response = await axiosInstance.post(`/product/create`, body);
    if (response.status !== 201) {
      throw new Error('Error creating product');
    }

    return true;
  } catch {
    return false;
  }
}
