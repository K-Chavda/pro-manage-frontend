// src/CustomDatePicker.js
import React, { useState } from "react";
import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = ({ dueDate, setDueDate }) => {
  const handleDueDateChange = (event) => {
    const date = new Date(event.target.value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    if (isNaN(date.getTime())) {
      setDueDate(null);
      return;
    }

    setDueDate(`${month}/${day}/${year}`);
  };

  return (
    <div>
      <input
        type="date"
        className={styles.dueDate}
        placeholder={dueDate || "Select Due Date"}
        onChange={handleDueDateChange}
      />
    </div>
  );
};

export default CustomDatePicker;
