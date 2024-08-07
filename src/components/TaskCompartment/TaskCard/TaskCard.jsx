import React, { useEffect, useState, useCallback } from "react";
import styles from "./TaskCard.module.css";
import { format, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";

// API Functions
import {
  updateTaskStatus,
  deleteTask,
  getFilteredIds,
} from "../../../api/Task";

// Icons
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

// Components
import CheckList from "./CheckList/CheckList";
import { promiseToast, showToast } from "../../Toast/Toast";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import TaskCardModel from "../TaskCardModel/TaskCardModel";

const transformKey = (key) => key.replace(/\s+/g, "").toLowerCase();

function TaskCard({
  task,
  compartmentType,
  getTasks,
  expandedTasks,
  setExpandedTasks,
  setIsLoading,
  filterValue,
}) {
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [localTask, setLocalTask] = useState(task);
  const [showOptions, setShowOptions] = useState(false);
  const [isTaskCardModelOpen, setIsTaskCardModelOpen] = useState(false);
  const [filteredIds, setFilteredIds] = useState([]);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const fetchTasks = useCallback(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    fetchTasks();
  }, [isTaskCardModelOpen, filteredIds, fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [isTaskCardModelOpen]);

  const updateTaskChecklist = (updatedChecklists) => {
    setLocalTask({
      ...localTask,
      checklist: updatedChecklists,
    });
  };

  const handleTaskStatusChange = (taskStatus, taskId) => {
    setIsLoading(true);
    const response = updateTaskStatus(taskStatus, taskId)
      .then((response) => {
        fetchTasks();
        setIsLoading(false);
        return response;
      })
      .catch((error) => {
        setIsLoading(false);
        throw error;
      });
    promiseToast(response, {
      pending: "Loading...",
    });
  };

  const handleExpandClick = (type, taskId) => {
    const transformedKey = transformKey(type);

    if (
      expandedTasks[transformedKey] &&
      expandedTasks[transformedKey].includes(taskId)
    ) {
      setExpandedTasks({
        ...expandedTasks,
        [transformedKey]: expandedTasks[transformedKey].filter(
          (id) => id !== taskId
        ),
      });
    } else {
      setExpandedTasks({
        ...expandedTasks,
        [transformedKey]: [...(expandedTasks[transformedKey] || []), taskId],
      });
    }
  };

  const isExpanded = (type, taskId) => {
    const transformedKey = transformKey(type);
    return (
      expandedTasks[transformedKey] &&
      expandedTasks[transformedKey].includes(taskId)
    );
  };

  const completedCount = localTask.checklist.reduce((count, item) => {
    return item.isCompleted ? count + 1 : count;
  }, 0);

  const getFirstTwoInitialsFromEmail = (email) => {
    return email
      .split("")
      .map((letter, index) => {
        if (index < 2) {
          return letter.toUpperCase();
        }
        return "";
      })
      .join("");
  };

  const handleShowMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleTaskDeleteClick = () => {
    setIsModelOpen(true);
    setShowOptions(!showOptions);
  };

  const deleteTaskOnConfirm = () => {
    const response = deleteTask(localTask._id)
      .then((response) => {
        fetchTasks();
        return response;
      })
      .catch((error) => {
        throw error;
      });

    promiseToast(response, {
      pending: "Deleting Task...",
      success: "Task deleted successfully",
    });
  };

  const handleEditClick = () => {
    setIsTaskCardModelOpen(true);
    setShowOptions(!showOptions);
  };

  const handleShareClick = (taskId) => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_SERVER_URI}/public/${taskId}`
    );
    setShowOptions(!showOptions);
    showToast("Link Copied", "success");
  };

  useEffect(() => {
    getFilteredIds(filterValue.toLowerCase()).then((response) => {
      setFilteredIds(response.taskIds);
    });
  }, [filterValue]);

  if (!filteredIds.includes(localTask._id)) return null;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeaderContainer}>
          <div className={styles.taskPriorityAndActionsContainer}>
            <div
              className={`${styles.moreOptionsCard} ${
                showOptions ? styles.moreOptionsShow : ""
              }`}
            >
              <span
                className={styles.moreOptionsSpan}
                onClick={handleEditClick}
              >
                Edit
              </span>
              <span
                className={styles.moreOptionsSpan}
                onClick={() => {
                  handleShareClick(localTask._id);
                }}
              >
                Share
              </span>
              <span
                className={styles.moreOptionsSpan}
                onClick={handleTaskDeleteClick}
              >
                Delete
              </span>
            </div>
            <div className={styles.taskPriorityAndInitialContainer}>
              <span
                className={`${styles.priorityIcon} ${
                  localTask.priority === "HIGH"
                    ? styles.high
                    : localTask.priority === "MODERATE"
                    ? styles.moderate
                    : styles.low
                }`}
              ></span>
              <span>{localTask.priority} PRIORITY</span>
              {localTask.assignedTo ? (
                <span className={styles.assigneeInitials}>
                  {getFirstTwoInitialsFromEmail(localTask.assignedTo)}
                </span>
              ) : null}
            </div>
            <div className={styles.taskActionsContainer}>
              <FiMoreHorizontal onClick={handleShowMoreClick} />
            </div>
          </div>
          <div className={styles.taskTitleContainer}>
            <span className={styles.taskTitle}>{localTask.title}</span>
          </div>
        </div>
        <div className={styles.taskCheckListContainer}>
          <div className={styles.checkListExpand}>
            <div className={styles.checkListCountContainer}>
              <span className={styles.checkListCount}>
                Checklist ({completedCount}/{localTask.checklist.length})
              </span>
            </div>
            <div className={styles.checkListExpandIconContainer}>
              <span
                className={`${styles.checkListExpandIcon} ${
                  isExpanded(localTask.status, localTask._id)
                    ? styles.checkListCollapseIcon
                    : ""
                }`}
                onClick={() =>
                  handleExpandClick(localTask.status, localTask._id)
                }
              >
                <IoIosArrowDown />
              </span>
            </div>
          </div>
          <div
            className={`${styles.checkListContainer} ${
              isExpanded(localTask.status, localTask._id)
                ? styles.checkListContainerExpanded
                : ""
            }`}
          >
            <CheckList
              checkLists={localTask.checklist}
              taskId={localTask._id}
              updateTaskChecklist={updateTaskChecklist}
            />
          </div>
          {isTaskCardModelOpen && (
            <TaskCardModel
              setIsTaskCardModelOpen={setIsTaskCardModelOpen}
              taskDetails={localTask}
              updateTaskChecklist={updateTaskChecklist}
            />
          )}
        </div>
        <div className={styles.taskDueDateAndStatusContainer}>
          <div className={styles.taskDueDateContainer}>
            {localTask.dueDate && (
              <span
                className={`${styles.taskDueDate} ${
                  localTask.status === "DONE"
                    ? styles.taskCompleted
                    : isPast(new Date(localTask.dueDate))
                    ? styles.taskInCompleted
                    : ""
                }`}
              >
                {format(new Date(localTask.dueDate), "LLL do")}
              </span>
            )}
          </div>
          <div className={styles.taskStatusContainer}>
            {compartmentType.map((type, index) =>
              localTask.status !== type.toUpperCase() ? (
                <span
                  key={index}
                  className={styles.taskStatus}
                  onClick={() =>
                    handleTaskStatusChange(type.toUpperCase(), localTask._id)
                  }
                >
                  {type.toUpperCase()}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        message="Are you sure you want to delete?"
        confirmButton="Yes, Delete"
        closeButton="Cancel"
        callBack={deleteTaskOnConfirm}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      />
    </>
  );
}

export default TaskCard;
