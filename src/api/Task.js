import axios from "axios";
import { BASE_URI, TOKEN } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

axios.defaults.headers.common["Authorization"] = TOKEN;

const createTask = async () => {};

const updateTask = async () => {};

const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URI}/tasks/${taskId}`);
    console.log(response);
    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const createCheckList = async () => {};

const updateCheckList = async (taskId, checkListId, isCompleted) => {
  try {
    const response = await axios.put(
      `${BASE_URI}/tasks/${taskId}/checklist/${checkListId}`,
      {
        isCompleted: isCompleted,
      }
    );
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const deleteCheckList = async () => {};

const getTask = async () => {};

const getCheckList = async (taskId) => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/${taskId}/checklists/`);
    return response.data?.checklists;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

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
