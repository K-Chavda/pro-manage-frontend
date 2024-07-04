import axios from "axios";
import { BASE_URI, TOKEN } from "../utils/constants";
import { showToast } from "../components/Toast/Toast";

axios.defaults.headers.common["Authorization"] = TOKEN;

const createTask = async ({ title, priority, assignedTo, dueDate }) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/tasks`,
      {
        title,
        priority,
        status: "TO DO",
        assignedTo,
        dueDate,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const updateTask = async ({
  title,
  priority,
  status,
  dueDate,
  assignedTo,
  taskId,
}) => {
  try {
    const response = await axios.put(
      `${BASE_URI}/tasks/${taskId}`,
      {
        title,
        priority,
        status,
        dueDate,
        assignedTo,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
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

const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URI}/tasks/${taskId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const createCheckList = async (taskId, isCompleted, title) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/tasks/${taskId}/checklist`,
      {
        isCompleted: isCompleted,
        title: title,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
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

const updateCheckList = async (
  taskId,
  checkListId,
  isCompleted = false,
  title = ""
) => {
  try {
    const response = await axios.put(
      `${BASE_URI}/tasks/${taskId}/checklist/${checkListId}`,
      {
        isCompleted: isCompleted,
        title: title,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
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

const deleteCheckList = async (taskId, checkListId) => {
  try {
    const response = await axios.delete(
      `${BASE_URI}/tasks/${taskId}/checklist/${checkListId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const getCheckList = async (taskId) => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/${taskId}/checklists`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data?.checklist;
  } catch (error) {
    // showToast(
    //   error.response?.data?.message || "Something Went Wrong!",
    //   "error"
    // );
  }
};

const getAnalytics = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/analytics/`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const getAllTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

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
    const response = await axios.patch(
      `${BASE_URI}/tasks/${taskId}`,
      {
        status: taskStatus,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
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

const getTask = async (taskId) => {
  try {
    const response = await axios.get(`${BASE_URI}/tasks/${taskId}`);

    return response;
  } catch (error) {
    showToast(
      error.response?.data?.message || "Something Went Wrong!",
      "error"
    );
  }
};

const getFilteredIds = async (filterValue) => {
  try {
    const response = await axios.post(
      `${BASE_URI}/tasks/filtered-ids`,
      { filterValue },
      {
        headers: { Authorization: localStorage.getItem("token") },
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

export {
  createTask,
  updateTask,
  deleteTask,
  createCheckList,
  updateCheckList,
  deleteCheckList,
  getCheckList,
  getAnalytics,
  getAllTasks,
  updateTaskStatus,
  getTask,
  getFilteredIds,
};
