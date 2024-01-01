import axios from "axios";

const API_URL = "http://localhost:5050/api/users";

// 註冊使用者
const register = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// 登入
const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// 登出
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
