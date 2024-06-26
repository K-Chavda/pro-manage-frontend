import React from "react";
import styles from "./TaskCard.module.css";
import { format } from "date-fns";

// Icons
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

// Components
import CheckList from "./CheckList/CheckList";
import { promiseToast } from "../../Toast/Toast";

function TaskCard({
  task,
  compartmentType,
  getTasks,
  expandedTasks,
  setExpandedTasks,
}) {
  const checkLists = [1, 2, 3];

  const handleTaskStatusChange = (taskStatus, taskId) => {
    const response = updateTaskStatus(taskStatus, taskId)
      .then((response) => {
        getTasks();
        return response;
      })
      .catch((error) => {
        throw error;
      });
    promiseToast(response, {
      pending: "Loading...",
    });
  };

  const handleExpandClick = (type, taskId) => {
    if (expandedTasks[type] && expandedTasks[type].includes(taskId)) {
      setExpandedTasks({
        ...expandedTasks,
        [type]: expandedTasks[type].filter((id) => id !== taskId),
      });
    } else {
      setExpandedTasks({
        ...expandedTasks,
        [type]: [...(expandedTasks[type] || []), taskId],
      });
    }
  };

  const isExpanded = (type, taskId) => {
    return expandedTasks[type] && expandedTasks[type].includes(taskId);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeaderContainer}>
        <div className={styles.taskPriorityAndActionsContainer}>
          <div className={styles.taskPriorityAndInitialContainer}>
            {task.priority} PRIORITY
          </div>
          <div className={styles.taskActionsContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
        <div className={styles.taskTitleContainer}>
          <span className={styles.taskTitle}>{task.title}</span>
        </div>
      </div>
      <div className={styles.taskCheckListContainer}>
        <div className={styles.checkListExpand}>
          <div className={styles.checkListCountContainer}>
            <span className={styles.checkListCount}>Checklist (0/3)</span>
          </div>
          <div className={styles.checkListExpandIconContainer}>
            <span
              className={`${styles.checkListExpandIcon} ${
                isExpanded("checklist", task._id)
                  ? styles.checkListCollapseIcon
                  : null
              }`}
              onClick={() => {
                handleExpandClick("checklist", task._id);
              }}
            >
              <IoIosArrowDown />
            </span>
          </div>
        </div>
        <div
          className={`${styles.checkListContainer} ${
            isExpanded("checklist", task._id)
              ? styles.checkListContainerExpanded
              : null
          }`}
        >
          <CheckList checkLists={checkLists} />
        </div>
      </div>
      <div className={styles.taskDueDateAndStatusContainer}>
        <div className={styles.taskDueDateContainer}>
          <span className={styles.taskDueDate}>
            {format(new Date(), "LLL do")}
          </span>
        </div>
        <div className={styles.taskStatusContainer}>
          {compartmentType.map((type, index) =>
            task.status !== type.toUpperCase() ? (
              <span
                key={index}
                className={styles.taskStatus}
                onClick={() =>
                  handleTaskStatusChange(type.toUpperCase(), task._id)
                }
              >
                {type.toUpperCase()}
              </span>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
