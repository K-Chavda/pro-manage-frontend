import React, { useEffect, useState } from "react";
import styles from "./Public.module.css";
import { useParams } from "react-router-dom";
import { format, isPast } from "date-fns";

// API Functions
import { getTask, getCheckList } from "../../api/Task";

// Icons
import { logoIcon } from "../../assets/icons/index";

// Utils

function Public() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [checklist, setCheckList] = useState([]);

  useEffect(() => {
    getTask(taskId).then((response) => {
      setTask(response.data?.task);
    });

    getCheckList(taskId).then((response) => {
      setCheckList(response);
    });
  }, [taskId]);

  const completedCount =
    checklist && checklist.filter((item) => item.isCompleted).length;

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <span className={styles.logoIcon}>
            <img src={logoIcon} alt="pro-manage" />
          </span>
          <span className={styles.logoText}>Pro Manage</span>
        </div>
        <div className={styles.publicTaskContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.priorityContainer}>
              <span className={styles.priorityIcon}></span>
              <span className={styles.priorityText}>
                {task.priority} PRIORITY
              </span>
            </div>
            <div className={styles.titleContainer}>
              <span className={styles.titleText}>{task.title}</span>
            </div>
          </div>
          <div className={styles.checkListsContainer}>
            <div className={styles.checkListCounterContainer}>
              <span>
                Checklist ({completedCount || 0}/
                {(checklist && checklist.length) || 0})
              </span>
            </div>
            <div className={styles.checkListsContainer}>
              {task?.checklist &&
                task.checklist.map((checklist) => (
                  <div className={styles.taskCheckList} key={checklist._id}>
                    <input
                      className={styles.checkList}
                      type="checkbox"
                      name="checkListCheckBox"
                      id={`checkListCheckBox`}
                      checked={checklist.isCompleted}
                    />
                    <label
                      htmlFor={`checkListCheckBox`}
                      className={styles.taskCheckListLabel}
                    >
                      {checklist.title}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.dueDateContainer}>
            <span>Due Date </span>
            {task.dueDate ? (
              <span className={styles.taskDueDatSpan}>
                {format(new Date(task.dueDate), "do LLL")}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Public;
