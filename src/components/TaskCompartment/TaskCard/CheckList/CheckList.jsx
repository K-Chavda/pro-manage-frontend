import React from "react";
import styles from "./CheckList.module.css";

function CheckList({ checkLists }) {
  return (
    <>
      {checkLists.map((checkList) => (
        <div className={styles.taskCheckList} key={checkList}>
          <input
            className={styles.checkList}
            type="checkbox"
            name="checkListCheckBox"
            id={`checkListCheckBox${checkList}`}
          />
          <label
            htmlFor={`checkListCheckBox${checkList}`}
            className={styles.taskCheckListLabel}
          >
            Task Check List Description
          </label>
        </div>
      ))}
    </>
  );
}

export default CheckList;
