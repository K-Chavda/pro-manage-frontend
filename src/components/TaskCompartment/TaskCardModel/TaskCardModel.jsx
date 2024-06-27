import React from "react";
import styles from "./TaskCardModel.module.css";

function TaskCardModel() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.taskCardModel}>
          <div className={styles.taskDetailsContainer}>
            <div className={styles.taskDetailInputContainer}>
              <label htmlFor="taskTitle">
                Title <span className={styles.required}>*</span>
              </label>
              <input
                id="taskTitle"
                type="text"
                placeholder="Enter Task Title"
              />
            </div>
            <div className={styles.taskPriorityInputContainer}>
              <span>
                Select Priority <span className={styles.required}>*</span>
              </span>
              <span value="LOW">LOW PRIORITY</span>
              <span value="MODERATE">MODERATE PRIORITY</span>
              <span value="HIGH">HIGH PRIORITY</span>
            </div>
          </div>
          <div className={styles.taskCheckListsContainer}></div>
          <div className={styles.modelButtonsContainer}></div>
        </div>
      </div>
    </>
  );
}

export default TaskCardModel;
