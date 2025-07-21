import axios, { HttpStatusCode } from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "../apis/auth.api";

const http = axios.create({
  baseURL: "http://localhost:8081/api.vinhbaonguyen.com/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptor = () => {
  http.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get("access_token");
      if (accessToken && config) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isUnauthorized =
        error?.response?.status === HttpStatusCode.Unauthorized;
      const refreshTokenValue = Cookies.get("refresh_token");

      // Chỉ thử refresh nếu có refresh_token và chưa retry lần nào
      if (isUnauthorized && refreshTokenValue && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await refreshToken(refreshTokenValue);
          const newAccessToken = response?.data?.RefreshToken;

          if (newAccessToken) {
            Cookies.set("access_token", newAccessToken);

            // Gán token mới vào header của request gốc và gửi lại
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return http(originalRequest); // resend original request
          }
        } catch (refreshError) {
          // Xử lý nếu refresh token thất bại (vd: chuyển hướng về trang login)
          console.error("Refresh token failed:", refreshError);
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/login"; // hoặc xử lý tùy theo luồng ứng dụng
        }
      }

      // Nếu không xử lý được, trả về lỗi ban đầu
      return Promise.reject(error);
    }
  );
};

export default http;
