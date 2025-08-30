import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export async function isLoggedIn() {
  const { data } = await API.get("/api/v1/auth/isLoggedIn", {
    withCredentials: true,
  });
  return data?.user;
}

export async function signup(data) {
  const response = await API({
    method: "POST",
    url: "/api/v1/auth/signup",
    data,
    withCredentials: true,
  });

  return response;
}

export async function login(data) {
  const response = await API({
    method: "POST",
    url: "/api/v1/auth/login",
    data,
    withCredentials: true,
  });

  return response;
}

export async function verify(token) {
  const response = await API({
    method: "GET",
    url: `/api/v1/auth/verification/${token}`,
    withCredentials: true,
  });

  return response;
}

export async function signout() {
  await API.get("/api/v1/auth/signout");
  return null;
}

export async function resetPassword({ data, reset_token }) {
  const { password, confirmPassword } = data;

  const response = await API.patch(
    `/api/v1/auth/resetpassword/${reset_token}`,
    {
      password,
      confirmPassword,
    }
  );

  return response.data;
}
