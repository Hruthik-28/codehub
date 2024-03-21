import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.RAPID_API_BASE_URI,
    headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.X_RAPID_API_HOST
    },
    params: {
        base64_encoded: "true",
        fields: "stdout"
    }
});

export default axiosInstance;
