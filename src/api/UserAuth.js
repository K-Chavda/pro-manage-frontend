import axios from "axios";
import { BASE_URI, TOKEN } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

axios.defaults.headers.common["Authorization"] = TOKEN;

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

const AddUser = async (email) => {
  try {
    const response = await axios.post(`${BASE_URI}/user/add`, {
      email,
    });

    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const GetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/user/get`);
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const UpdateUserDetails = async (
  name,
  email,
  oldPassword,
  newPassword,
  userId
) => {
  try {
    const response = await axios.patch(`${BASE_URI}/user/update`, {
      name,
      email,
      oldPassword,
      newPassword,
    });

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const getUserDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/user/details/`);
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export {
  RegisterUser,
  LoginUser,
  AddUser,
  GetUsers,
  UpdateUserDetails,
  getUserDetails,
};
