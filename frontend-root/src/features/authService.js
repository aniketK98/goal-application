import axios from "axios";

const API_URL = "https://shy-lime-lizard-sock.cyclic.app/api/users/";

//register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//login User
const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

//logout
const logout = async () => {
  console.log("logout service");
  return await localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
