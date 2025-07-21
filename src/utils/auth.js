import Cookies from "js-cookie";

export const checkIsLogin = () => {
  // Lấy accessToken từ Cookie
  const accessToken = Cookies.get("access_token");

  if (accessToken) return;

  return false;
};

/**
 * Giải mã JWT token
 * @description Giải mã JWT token để lấy thông tin người dùng
 * @param token JWT token
 * @returns Chuỗi jwt đã được giải mã
 * @author NVQUY(20/03/2025)
 */
export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
