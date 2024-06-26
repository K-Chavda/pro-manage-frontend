import axios from "axios";
import { BASE_URI, TOKEN } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

axios.defaults.headers.common["Authorization"] = TOKEN;

const createTask = async () => {};

const updateTask = async () => {};

const deleteTask = async () => {};

const createCheckList = async () => {};

const updateCheckList = async () => {};

const deleteCheckList = async () => {};

const getTask = async () => {};

const getCheckList = async () => {};

const getAnalytics = async () => {};

const getAllTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/`, {});
    return response.data?.tasks;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const updateTaskStatus = async (taskStatus, taskId) => {
  console.log(taskId);
  console.log(taskStatus);
  try {
    const response = await axios.patch(`${BASE_URI}/tasks/${taskId}`, {
      status: taskStatus,
    });

    console.log(`updateTaskStatus: ${response}`);
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

export {
  createTask,
  updateTask,
  deleteTask,
  createCheckList,
  updateCheckList,
  deleteCheckList,
  getTask,
  getCheckList,
  getAnalytics,
  getAllTasks,
  updateTaskStatus,
};
