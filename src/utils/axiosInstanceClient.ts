import axios from 'axios';

export const axiosInstanceClient = axios.create({
  baseURL: process.env.BACKEND_API || 'https://se-api.sssboom.xyz/api',
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
