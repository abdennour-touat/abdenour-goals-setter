//here we do all the HTTP requests

import axios from "axios";

const API_URL = "/api/users/";

//register user in the database

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logIn = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logOut = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logOut,
  logIn,
};

export default authService;
