import React, { useState, useCallback } from "react";
import styles from "./Tasks.module.css";
import { TAST_STATUS, TOKEN } from "../../utils/constants";
import axios from "axios";

// API Functions
import { getAllTasks } from "../../api/Task";

// Components
import TaskCompartment from "../../components/TaskCompartment/TaskCompartment";
import { useEffect } from "react";

function Tasks({ filterValue }) {
  const [allTasks, setAllTasks] = useState({});

  const getTasks = useCallback(async () => {
    axios.defaults.headers.common["Authorization"] = TOKEN;

    const response = await getAllTasks();
    setAllTasks(response);
  }, []);

  useEffect(() => {}, [filterValue]);

  return (
    <>
      <div className={styles.mainContainer}>
        <TaskCompartment
          compartmentTypes={TAST_STATUS}
          allTasks={allTasks}
          getTasks={getTasks}
          filterValue={filterValue}
        />
      </div>
    </>
  );
}

export default Tasks;
