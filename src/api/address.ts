'use server';
import { IAddressSend, IAdressData, IAdressDataGet, IDistrictsData, IProviceData, ISubDistrictsData } from '@/interfaces/address';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getAddress = async () => {
  try {
    const res = await axiosInstance.get('/address');
    if (res.status !== 200) {
      return null;
    }
    const data = res.data.data.map((item: IAdressDataGet) => {
      return {
        ...item,
        id: item.id.toString(),
      };
    }) as IAdressData[];
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const getAddressByID = async (id: string = '') => {
  try {
    const res = await axiosInstance.get(`/address/${id}`);
    if (res.status !== 200) {
      return null;
    }
    res.data.data.id = res.data.data.id.toString();
    return res.data.data as IAdressData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getProvinces = async () => {
  try {
    const res = await axiosInstance.get('/geo-location/provinces');
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as IProviceData[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSubDistricts = async (district_id: string) => {
  try {
    const res = await axiosInstance.get(`/geo-location/sub-districts/${district_id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as ISubDistrictsData[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDistricts = async (province_id: string) => {
  try {
    const res = await axiosInstance.get(`/geo-location/districts/${province_id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.data as IDistrictsData[];
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/address/${id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.success as boolean;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const putAddress = async (id: string, data: IAddressSend) => {
  try {
    const res = await axiosInstance.put(`/address/${id}`, data);
    if (res.status !== 200) {
      return null;
    }
    return res.data.success as boolean;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postAddress = async (data: IAddressSend) => {
  try {
    const res = await axiosInstance.post(`/address`, data);
    if (res.status !== 200) {
      return null;
    }
    return res.data.success as boolean;
  } catch (err) {
    console.log(err);
    return null;
  }
};
