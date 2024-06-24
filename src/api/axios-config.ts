import axios, { isAxiosError } from 'axios';

const baseURL = import.meta.env.VITE_APP_API_URL;

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
export { isAxiosError };