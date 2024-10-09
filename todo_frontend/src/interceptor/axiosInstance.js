import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "https://naingkhanthtet.pythonanywhere.com",
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");

                if (refreshToken) {
                    const response = await axios.post("/token/refresh/", {
                        refresh: refreshToken,
                    });

                    localStorage.setItem("access_token", response.data.access);

                    axiosInstance.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${response.data.access}`;
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.access}`;

                    return axiosInstance(originalRequest);
                }
            } catch (tokenRefreshError) {
                console.log("Token refresh failed", tokenRefreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(tokenRefreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
