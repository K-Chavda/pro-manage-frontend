import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { format } from "date-fns";

// Components
import SelectList from "../../components/SelectList/SelectList";

// Pages
import Tasks from "../TasksPage/Tasks";

// Utils
import formatDate from "../../utils/formatDate";

function Dashboard() {
  const [filterValue, setFilterValue] = useState(
    localStorage.getItem("taskFilter") || "This week"
  );

  useEffect(() => {
    localStorage.setItem("taskFilter", filterValue);
  }, [filterValue]);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.userNameAndHeadingContainer}>
            <div className={styles.userNameContainer}>
              <span className={styles.userName}>Welcome! Name</span>
            </div>
            <div className={styles.headingContainer}>
              <span className={styles.heading}>Board</span>
            </div>
          </div>
          <div className={styles.dateAndFilterContainer}>
            <div className={styles.dateContainer}>
              <span className={styles.date}>{format(new Date(), "PPP")}</span>
            </div>
            <div className={styles.filterContainer}>
              <SelectList
                options={["Today", "This week", "This month"]}
                value={filterValue}
                onChange={setFilterValue}
              />
            </div>
          </div>
        </div>
        <div className={styles.tasksContainer}>
          <Tasks />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
