import http from "../utils/http";

export const register = async (data) => {
  const response = await http.post("auth/register", data);

  return response;
};

export const login = async (data) => {
  const response = await http.post("auth/sign-in", data);

  return response;
};

export const refreshToken = async (data) => {
  const response = await http.post("auth/refresh-token", data);

  return response;
};
