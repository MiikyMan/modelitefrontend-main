'use server';
import { IProfileData, IProfileUpdateInfo, IProfileUpdateProfile } from '@/interfaces/profile';
import { axiosInstance } from '@/utils/axiosInstanceServer';

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    if (response.status !== 200) {
      return null;
    }

    return response.data.data as IProfileData;
  } catch {
    return null;
  }
};

export const updateUserInfo = async (data: IProfileUpdateInfo) => {
  try {
    const response = await axiosInstance.patch('/user', data);
    if (response.status !== 200) {
      return false;
    }
    return response.data.data as IProfileData;
  } catch {
    return false;
  }
};

export const updateProfile = async (data: IProfileUpdateProfile) => {
  try {
    const response = await axiosInstance.patch('/user/profile', data);
    if (response.status !== 200) {
      return false;
    }
    return response.data.data as IProfileData;
  } catch {
    return false;
  }
};
