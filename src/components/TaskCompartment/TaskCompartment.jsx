import React, { useState, useEffect } from "react";
import styles from "./TaskCompartment.module.css";

// Icons
import { FaPlus } from "react-icons/fa";
import { VscCollapseAll } from "react-icons/vsc";

// Components
import TaskCard from "./TaskCard/TaskCard";

function TaskCompartment({ compartmentType, allTasks, getTasks }) {
  const [expandedTasks, setExpandedTasks] = useState(() => {
    const storedExpandedTasks = localStorage.getItem("expandedTasks");
    return storedExpandedTasks ? JSON.parse(storedExpandedTasks) : {};
  });

  // Save expanded tasks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("expandedTasks", JSON.stringify());
  }, [expandedTasks]);

  const transformedTasks = Object.keys(allTasks).reduce((acc, key) => {
    const transformedKey = key.replace(/\s+/g, "").toLowerCase();
    acc[transformedKey] = allTasks[key];
    return acc;
  }, {});

  const handleCollapseAllClick = (type) => {
    console.log(type);
    toggleTaskExpansion(type);
  };

  // Toggle task card expansion
  const toggleTaskExpansion = (type) => {
    const updatedExpandedTasks = {
      ...expandedTasks,
      [type]: [],
    };
    console.log(updatedExpandedTasks);
    setExpandedTasks(updatedExpandedTasks);

    // Clear localStorage for this specific type
    // localStorage.setItem("expandedTasks", JSON.stringify(updatedExpandedTasks));
  };

  console.log(expandedTasks);

  return (
    <>
      {compartmentType.map((type) => {
        const typeKey = type.replace(/\s+/g, "").toLowerCase();
        return (
          <div className={styles.taskCardContainer} key={type}>
            <div className={styles.headerContainer}>
              <div className={styles.statusContainer}>
                <span className={styles.status}>{type}</span>
              </div>
              <div className={styles.actionsContainer}>
                {type.toUpperCase() === "TO DO" ? (
                  <span className={styles.actions}>
                    <FaPlus />
                  </span>
                ) : null}
                <span
                  className={styles.actions}
                  onClick={() => handleCollapseAllClick(typeKey)}
                >
                  <VscCollapseAll />
                </span>
              </div>
            </div>
            <div className={styles.taskCards}>
              {transformedTasks[typeKey] &&
                transformedTasks[typeKey].map((taskItem, index) => (
                  <TaskCard
                    key={taskItem._id}
                    task={taskItem}
                    compartmentType={compartmentType}
                    getTasks={getTasks}
                    expandedTasks={expandedTasks}
                    setExpandedTasks={setExpandedTasks}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TaskCompartment;
