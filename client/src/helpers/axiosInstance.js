import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axiosInstance.defaults.withCredentials = false;

export default axiosInstance;
