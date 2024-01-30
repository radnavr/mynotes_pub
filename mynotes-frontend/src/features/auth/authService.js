import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

// USER REGISTRATION
const register = async (providedUserData) => {
  const response = await axios.post(API_URL, providedUserData);

  if (response.data) {
    localStorage.setItem("my-notes-user", JSON.stringify(response.data));
  }

  return response.data;
};

// USER LOGIN
const login = async (providedUserData) => {
  const response = await axios.post(API_URL + "/login", providedUserData);

  if (response.data) {
    localStorage.setItem("my-notes-user", JSON.stringify(response.data));
  }

  return response.data;
};

// USER LOGOUT
const logout = () => {
  localStorage.removeItem("my-notes-user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
