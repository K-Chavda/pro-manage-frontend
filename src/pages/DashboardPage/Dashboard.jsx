import React from "react";
import styles from "./Dashboard.module.css";

// Components
import SelectList from "../../components/SelectList/SelectList";

// Pages
import Tasks from "../TasksPage/Tasks";

// Utils
import formatDate from "../../utils/formatDate";

function Dashboard() {
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
              <span className={styles.date}>{formatDate(new Date())}</span>
            </div>
            <div className={styles.filterContainer}>
              <SelectList
                defaultValue={"This week"}
                options={["Today", "This week", "This month"]}
                onChange={(value) => console.log(value)}
              />
              {/* <span className={styles.filter}>This week</span> */}
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
