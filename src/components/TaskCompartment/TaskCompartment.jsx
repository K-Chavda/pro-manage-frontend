import React, { useState, useEffect, useCallback } from "react";
import styles from "./TaskCompartment.module.css";

// Icons
import { FaPlus } from "react-icons/fa";
import { VscCollapseAll } from "react-icons/vsc";

// Components
import TaskCard from "./TaskCard/TaskCard";
import TaskCardSkeleton from "./TaskCardSkeleton/TaskCardSkeleton";
import TaskCardModel from "./TaskCardModel/TaskCardModel";

const transformKey = (key) => key.replace(/\s+/g, "").toLowerCase();

function TaskCompartment({
  compartmentTypes,
  allTasks,
  getTasks,
  filterValue,
}) {
  const [isTaskCardModelOpen, setIsTaskCardModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState(() => {
    const storedExpandedTasks = localStorage.getItem("expandedTasks");
    return storedExpandedTasks ? JSON.parse(storedExpandedTasks) : {};
  });

  useEffect(() => {
    localStorage.setItem("expandedTasks", JSON.stringify(expandedTasks));
  }, [expandedTasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
      setIsLoading(false);
    };
    fetchTasks();
  }, [getTasks]); // This effect runs only once because getTasks is memoized

  const handleCollapseAllClick = useCallback((typeKey) => {
    setExpandedTasks((prevExpandedTasks) => ({
      ...prevExpandedTasks,
      [typeKey]: [],
    }));
  }, []);

  const transformedTasks = Object.keys(allTasks).reduce((acc, key) => {
    const transformedKey = transformKey(key);
    acc[transformedKey] = allTasks[key];
    return acc;
  }, {});

  const handleTaskAddClick = () => {
    setIsTaskCardModelOpen(true);
  };

  return (
    <>
      {compartmentTypes &&
        compartmentTypes.map((type) => {
          const typeKey = transformKey(type);
          return (
            <div className={styles.taskCardContainer} key={typeKey}>
              <div className={styles.headerContainer}>
                <div className={styles.statusContainer}>
                  <span className={styles.status}>{type}</span>
                </div>
                <div className={styles.actionsContainer}>
                  {type.toUpperCase() === "TO DO" && (
                    <span
                      className={styles.actions}
                      onClick={handleTaskAddClick}
                    >
                      <FaPlus />
                    </span>
                  )}
                  <span
                    className={styles.actions}
                    onClick={() => handleCollapseAllClick(typeKey)}
                  >
                    <VscCollapseAll />
                  </span>
                </div>
              </div>
              <div className={styles.taskCards}>
                {isLoading ? (
                  <TaskCardSkeleton />
                ) : (
                  transformedTasks[typeKey]?.map((taskItem) => (
                    <TaskCard
                      key={taskItem._id}
                      task={taskItem}
                      compartmentType={compartmentTypes}
                      getTasks={getTasks}
                      expandedTasks={expandedTasks}
                      setExpandedTasks={setExpandedTasks}
                      setIsLoading={setIsLoading}
                      filterValue={filterValue}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      {isTaskCardModelOpen ? (
        <TaskCardModel
          setIsTaskCardModelOpen={setIsTaskCardModelOpen}
          getTasks={getTasks}
        />
      ) : null}
    </>
  );
}

export default TaskCompartment;
