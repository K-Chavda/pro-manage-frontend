import React from "react";
import styles from "./Tasks.module.css";
import { format } from "date-fns";

// Icons
import { FaPlus } from "react-icons/fa6";
import { VscCollapseAll } from "react-icons/vsc";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

// Components
import CheckList from "./CheckList/CheckList";

function Tasks() {
  const checkLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.taskCardContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.statusContainer}>
              <span className={styles.status}>Status</span>
            </div>
            <div className={styles.actionsContainer}>
              <span className={styles.actions}>
                <FaPlus />
              </span>
              <span className={styles.actions}>
                <VscCollapseAll />
              </span>
            </div>
          </div>
          <div className={styles.taskCards}>
            <div className={styles.card}>
              <div className={styles.cardHeaderContainer}>
                <div className={styles.taskPriorityAndActionsContainer}>
                  <div className={styles.taskPriorityAndInitialContainer}>
                    MODERATE PRIORITY
                  </div>
                  <div className={styles.taskActionsContainer}>
                    <FiMoreHorizontal />
                  </div>
                </div>
                <div className={styles.taskTitleContainer}>
                  <span className={styles.taskTitle}>
                    Typography change in the First two screens of the Typography
                    change in the First two screens of the
                  </span>
                </div>
              </div>
              <div className={styles.taskCheckListContainer}>
                <div className={styles.checkListExpand}>
                  <div className={styles.checkListCountContainer}>
                    <span className={styles.checkListCount}>
                      Checklist (0/3)
                    </span>
                  </div>
                  <div className={styles.checkListExpandIconContainer}>
                    <span className={styles.checkListExpandIcon}>
                      <IoIosArrowDown />
                    </span>
                  </div>
                </div>
                <div className={styles.checkListContainer}>
                  <CheckList checkLists={checkLists} />
                </div>
              </div>
              <div className={styles.taskDueDateAndStatusContainer}>
                <div className={styles.taskDueDateContainer}>
                  <span className={`${styles.taskDueDate} ${styles.completed}`}>
                    {format(new Date(), "LLL do")}
                  </span>
                </div>
                <div className={styles.taskStatusContainer}>
                  <span className={styles.taskStatus}>PROGRESS</span>
                  <span className={styles.taskStatus}>TO-DO</span>
                  <span className={styles.taskStatus}>DONE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
