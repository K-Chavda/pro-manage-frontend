import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

const RegisterUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URI}/user/register`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const LoginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URI}/user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export { RegisterUser, LoginUser };
