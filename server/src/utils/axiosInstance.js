import axios from "axios";

const axiosInstance = axios.create();

axios.defaults.baseURL = "https://judge0-ce.p.rapidapi.com";
axios.defaults.params = {
    base64_encoded: "true",
    fields: "*"
};
axios.defaults.headers = {
    "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.X_RAPID_API_HOST
};

export default axiosInstance;
