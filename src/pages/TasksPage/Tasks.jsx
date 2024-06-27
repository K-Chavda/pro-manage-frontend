import React, { useState, useCallback } from "react";
import styles from "./Tasks.module.css";
import { TAST_STATUS } from "../../utils/constants";

// API Functions
import { getAllTasks } from "../../api/Task";

// Components
import TaskCompartment from "../../components/TaskCompartment/TaskCompartment";

function Tasks() {
  const [allTasks, setAllTasks] = useState({});

  const getTasks = useCallback(async () => {
    const response = await getAllTasks();
    setAllTasks(response);
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <TaskCompartment
          compartmentTypes={TAST_STATUS}
          allTasks={allTasks}
          getTasks={getTasks}
        />
      </div>
    </>
  );
}

export default Tasks;
