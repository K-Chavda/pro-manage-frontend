import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { format } from "date-fns";

// API Functions
import { AddUser } from "../../api/UserAuth";

// Components
import SelectList from "../../components/SelectList/SelectList";

// Pages
import Tasks from "../TasksPage/Tasks";

// Icons
import { usersIcon } from "../../assets/icons/index";
import { promiseToast, showToast } from "../../components/Toast/Toast";

function Dashboard() {
  const [value, setValue] = useState("");
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const [filterValue, setFilterValue] = useState(
    localStorage.getItem("taskFilter") || "This week"
  );

  useEffect(() => {
    localStorage.setItem("taskFilter", filterValue);
  }, [filterValue]);

  const handleAddPeopleClick = () => {
    setIsAddPeopleOpen(true);
  };

  const handleCancelClick = () => {
    setIsAddPeopleOpen(false);
    setIsUserAdded(false);
    setValue("");
  };

  const handleEmailChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddEmailClick = () => {
    const email = value.trim();

    if (!email) {
      showToast("Please, Provide Required Fields", "error");
    }

    const AddUserPromise = AddUser(email)
      .then((response) => {
        if (response) setIsUserAdded(true);
        return response;
      })
      .catch((error) => {
        throw error;
      });

    promiseToast(AddUserPromise, {
      pending: "Please Wait While Adding User...",
      success: "User Added Successfully",
    });
  };

  console.log(value);

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
              <div
                className={styles.addPeopleContainer}
                onClick={handleAddPeopleClick}
              >
                <img src={usersIcon} alt="pro-manage" />
                <span className={styles.addPeopleSpan}>Add People</span>
              </div>
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
      <div
        className={`${styles.addPeopleModelContainer} ${
          !isAddPeopleOpen ? styles.addPeopleModelHide : null
        }`}
      >
        <div className={styles.addPeopleModelContent}>
          <span className={styles.addPeopleModelTitle}>
            {isUserAdded
              ? `${value} added to board`
              : "Add people to the board"}
          </span>
          {!isUserAdded ? (
            <div className={styles.addPeopleModelInputContainer}>
              <input
                type="text"
                placeholder="Enter name or email"
                className={styles.addPeopleModelInput}
                value={value}
                onChange={handleEmailChange}
              />
            </div>
          ) : null}
          <div className={styles.addPeopleModelButtonContainer}>
            {!isUserAdded ? (
              <button
                onClick={handleCancelClick}
                className={`${styles.addPeopleModelButton} ${styles.secondaryButton}`}
              >
                Cancel
              </button>
            ) : null}
            <button
              className={`${styles.addPeopleModelButton} ${styles.primaryButton}`}
              onClick={isUserAdded ? handleCancelClick : handleAddEmailClick}
            >
              {isUserAdded ? "Okay, got it!" : "Add Email"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
