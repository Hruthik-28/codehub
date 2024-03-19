import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://judge0-ce.p.rapidapi.com",
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
