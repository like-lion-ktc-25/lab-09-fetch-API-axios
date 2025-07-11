import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://686f87d191e85fac42a174e5.mockapi.io/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
