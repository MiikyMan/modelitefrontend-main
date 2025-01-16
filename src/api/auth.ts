'use server';
import { axiosInstance } from '@/utils/axiosInstanceServer';
import { headers } from 'next/headers';

export const getGoogleAuth = async () => {
  try {
    // get hostname: se-api.sssboom.xyz
    const hostname = headers().get('host');
    const http = hostname?.includes('localhost') ? 'http' : 'https';
    const redirectUrl = `${http}://${hostname}`;
    const response = await axiosInstance.get('/auth/google', {
      params: {
        redirectUrl: redirectUrl,
      },
    });
    if (response.status !== 200) {
      return null;
    }
    return response.data.data as string;
  } catch {
    return null;
  }
};

export const isAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    if (response.status !== 200) {
      return false;
    }
    return response.data.success as boolean;
  } catch {
    return false;
  }
};

export const Logout = async () => {
  try {
    const response = await axiosInstance.get('/auth/logout');
    if (response.status !== 200) {
      return false;
    }
    return response.data.success as boolean;
  } catch {
    return false;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    if (response.status !== 200) {
      return false;
    }
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log('ERROR', error);
    return false;
  }
};
