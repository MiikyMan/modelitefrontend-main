'use server';
import axios from 'axios';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API || 'https://se-api.sssboom.xyz/api',
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const cookieHeader = headers().get('cookie');
  if (cookieHeader) {
    config.headers['cookie'] = cookieHeader;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  // For status 401, redirect to login page
  if (response.status === 401) {
    redirect('/login');
  }
  if (response.status === 500) {
    console.log('Internal Server Error');
  }
  return response;
});
