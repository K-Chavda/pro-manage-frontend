import React, { useEffect, useState } from "react";
import styles from "./TaskCardModel.module.css";
import { format } from "date-fns";
import { nanoid } from "nanoid";

// API Functions
import { GetUsers } from "../../../api/UserAuth";
import {
  updateTask,
  createTask,
  updateCheckList,
  createCheckList,
  deleteCheckList,
  getCheckList,
} from "../../../api/Task";

// Components
import CustomDatePicker from "../../DatePicker/CustomDatePicker";

// Constants
import { PRIORITY } from "../../../utils/constants";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { deleteIcon } from "../../../assets/icons/index"; // Corrected import

// Utils
import extractInitials from "../../../utils/extractInitials";
import { promiseToast, showToast } from "../../Toast/Toast";

const TaskCardModel = ({
  setIsTaskCardModelOpen,
  taskDetails = {},
  getTasks,
}) => {
  const [usersList, setUsersList] = useState([]);
  const [taskData, setTaskData] = useState({
    title: taskDetails.title || "",
    priority: taskDetails.priority || "",
    assignedTo: taskDetails.assignedTo || "",
    dueDate: taskDetails.dueDate || "",
  });
  const [showUsersList, setShowUsersList] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState(taskDetails.dueDate || "");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsers();
        setUsersList(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getCheckLists = async () => {
    try {
      const response = getCheckList(taskDetails._id).then((response) => {
        setChecklist(response);
        return response;
      });

      promiseToast(response, { pending: "Fetching Checklists..." });
    } catch (error) {
      console.error("Error fetching checklists:", error);
    }
  };

  useEffect(() => {
    if (taskDetails._id) {
      getCheckLists();
    }
  }, [taskDetails._id]);

  const handleAssignOnClick = (email) => {
    setTaskData({ ...taskData, assignedTo: email });
    setShowUsersList(false);
  };

  const handlePriorityChange = (priority) => {
    setTaskData({ ...taskData, priority });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const validateFields = () => {
    const { title, priority, assignedTo } = taskData;

    if (!title.trim()) {
      showToast("Please Enter a Task Title", "error");
      return false;
    }

    if (!priority) {
      showToast("Please Select Task Priority", "error");
      return false;
    }

    // Check each checklist item for title
    if (checklist)
      for (const item of checklist) {
        if (!item.title.trim()) {
          showToast("Please Enter a Checklist Title", "error");
          return false;
        }
      }

    return true;
  };

  const handleSaveButtonClick = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      const taskPayload = {
        ...taskData,
        dueDate: dueDate,
        status: taskData.status || "TO DO",
      };

      if (taskDetails._id) {
        if (
          taskData.title !== taskDetails.title &&
          taskDetails.owner !== localStorage.getItem("email")
        ) {
          showToast("Only Owner can Change Task Title", "error");
          return;
        }

        if (
          taskData.assignedTo !== taskDetails.assignedTo &&
          taskDetails.owner !== localStorage.getItem("email")
        ) {
          showToast("Only Owner can Change User Assigned To", "error");
          return;
        }

        const updateTaskPromise = updateTask({
          ...taskPayload,
          taskId: taskDetails._id,
        }).then((response) => {
          const updateCheckListPromise = updateTaskCheckList(
            response.task._id
          ).then((response) => {
            getTasks();
            setIsTaskCardModelOpen(false);
            return response;
          });

          return response;
        });

        promiseToast(updateTaskPromise, {
          pending: "Updating Task Details...",
          success: "Task Details Updated Successfully",
        });
      } else {
        const createTaskPromise = createTask(taskPayload).then((response) => {
          const createCheckListPromise = createTaskCheckList(
            response.data.newTask._id
          ).then((response) => {
            getTasks();
            setIsTaskCardModelOpen(false);
            return response;
          });

          return response;
        });

        promiseToast(createTaskPromise, {
          pending: "Creating Task...",
          success: "Task Created Successfully",
        });
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const createTaskCheckList = async (taskId) => {
    if (!checklist || checklist.length === 0) return;
    for (const item of checklist) {
      const { isCompleted, title } = item;
      await createCheckList(taskId, isCompleted, title);
    }
  };

  const updateTaskCheckList = async (taskId) => {
    if (!checklist || checklist.length === 0) return;
    for (const item of checklist) {
      const { isCompleted, title, _id } = item;
      await updateCheckList(taskId, _id, isCompleted, title);
    }
  };

  const handleCancelButtonClick = () => {
    setIsTaskCardModelOpen(false);
  };

  const completedCount =
    checklist && checklist.filter((item) => item.isCompleted).length;

  const handleAddCheckListButtonClick = async () => {
    const newItem = {
      _id: nanoid(),
      title: " ",
      isCompleted: false,
    };

    if (!taskData._id) {
      setChecklist([...checklist, newItem]);
    } else {
      await createCheckList(
        taskData._id,
        newItem.isCompleted,
        newItem.title
      ).then((response) => {
        console.log(response);
        getCheckLists();
      });
    }
  };

  const handleCheckListChange = (id, isCompleted) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item._id === id ? { ...item, isCompleted } : item
      )
    );
  };

  const handleCheckListOnChange = (id, title) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) => (item._id === id ? { ...item, title } : item))
    );
  };

  const handleCheckListDeleteClick = async (taskId, checkListId) => {
    try {
      if (taskId) await deleteCheckList(taskId, checkListId);

      setChecklist((prevChecklist) =>
        prevChecklist.filter((item) => item._id !== checkListId)
      );
    } catch (error) {
      // console.error("Error deleting checklist item:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.taskCardModel}>
        <div className={styles.taskDetailsContainer}>
          <div className={styles.taskDetailInputContainer}>
            <label htmlFor="taskTitle">
              Title <span className={styles.required}>*</span>
            </label>
            <input
              id="taskTitle"
              type="text"
              name="title"
              placeholder="Enter Task Title"
              value={taskData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.taskPriorityInputContainer}>
            <span>
              Select Priority <span className={styles.required}>*</span>
            </span>
            <div className={styles.priorityContainer}>
              {PRIORITY.map((priority) => (
                <span
                  key={nanoid()}
                  className={`${styles.priority} ${
                    taskData.priority === priority ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange(priority)}
                >
                  <span
                    className={`${styles.priorityIcon} ${
                      priority === "HIGH"
                        ? styles.high
                        : priority === "MODERATE"
                        ? styles.moderate
                        : styles.low
                    }`}
                  ></span>
                  {priority} PRIORITY
                </span>
              ))}
            </div>
          </div>
          <div className={styles.assignedToContainer}>
            <label htmlFor="assignedTo">Assigned To</label>
            <div className={styles.userListLovContainer}>
              <input
                id="assignedTo"
                type="text"
                name="assignedTo"
                placeholder="Add an assignee"
                value={taskData.assignedTo}
                readOnly
                onClick={() => setShowUsersList(!showUsersList)}
              />
              <span
                className={
                  showUsersList ? styles.lovCollapseIcon : styles.lovExpandIcon
                }
                onClick={() => setShowUsersList(!showUsersList)}
              >
                <IoIosArrowDown />
              </span>
              {showUsersList && (
                <div className={styles.usersLovContainer}>
                  {usersList.map((user) => (
                    <div
                      className={styles.usersLovItemContainer}
                      key={user._id}
                    >
                      <div className={styles.userEmailAndInitials}>
                        <span className={styles.userInitialsSpan}>
                          {extractInitials(user.email)}
                        </span>
                        <span className={styles.userEmailSpan}>
                          {user.email}
                        </span>
                      </div>
                      <button
                        className={styles.assignButton}
                        type="button"
                        onClick={() => handleAssignOnClick(user.email)}
                      >
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.taskCheckListContainer}>
          <span className={styles.checkListCount}>
            Checklist ({completedCount || 0}/
            {(checklist && checklist.length) || 0})
          </span>
          <div className={styles.checkListContainer}>
            {checklist &&
              checklist.map((checkList) => (
                <div className={styles.taskCheckList} key={checkList._id}>
                  <input
                    className={styles.checkList}
                    type="checkbox"
                    checked={checkList.isCompleted}
                    onChange={(e) =>
                      handleCheckListChange(checkList._id, e.target.checked)
                    }
                  />
                  <input
                    type="text"
                    className={styles.taskCheckListLabel}
                    value={checkList.title}
                    onChange={(e) =>
                      handleCheckListOnChange(checkList._id, e.target.value)
                    }
                  />
                  <span
                    className={styles.deleteCheckListIcon}
                    onClick={() => {
                      handleCheckListDeleteClick(taskData._id, checkList._id);
                    }}
                  >
                    <img src={deleteIcon} alt="" />
                  </span>
                </div>
              ))}
          </div>
          <span
            className={styles.addCheckListIcon}
            onClick={handleAddCheckListButtonClick}
          >
            <FaPlus />
            <span>Add Item</span>
          </span>
        </div>
        <div className={styles.modelButtonsContainer}>
          <div className={styles.dueDateContainer}>
            <CustomDatePicker dueDate={dueDate} setDueDate={setDueDate} />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              type="button"
              className={`${styles.modelButtons} ${styles.secondaryButton}`}
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.modelButtons} ${styles.primaryButton}`}
              onClick={handleSaveButtonClick}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskCardModel;
