import React, { useState, useEffect, useRef } from "react";
import styles from "./CheckList.module.css";

// API Functions
import { updateCheckList } from "../../../../api/Task";

// Components
import { promiseToast } from "../../../Toast/Toast";

function CheckList({
  checkLists,
  taskId,
  updateTaskChecklist,
  handleCreateChecklistItem,
}) {
  const [localCheckLists, setLocalCheckLists] = useState(checkLists);
  const optimisticUpdates = useRef({});

  useEffect(() => {
    setLocalCheckLists(checkLists);
  }, [checkLists]);

  const handleCheckListChange = (checkListId, isCompleted) => {
    optimisticUpdates.current[checkListId] = isCompleted;

    const updatedCheckLists = localCheckLists.map((checkList) =>
      checkList._id === checkListId ? { ...checkList, isCompleted } : checkList
    );
    setLocalCheckLists(updatedCheckLists);

    updateCheckList(taskId, checkListId, isCompleted)
      .then((response) => {
        delete optimisticUpdates.current[checkListId];
        updateTaskChecklist(updatedCheckLists);
        return response;
      })
      .catch((error) => {
        const revertedCheckLists = localCheckLists.map((checkList) =>
          checkList._id === checkListId
            ? { ...checkList, isCompleted: !isCompleted }
            : checkList
        );
        setLocalCheckLists(revertedCheckLists);
        delete optimisticUpdates.current[checkListId];
        throw error;
      });

    promiseToast(updateCheckList(taskId, checkListId, isCompleted), {
      pending: "Loading...",
    });
  };

  return (
    <>
      {localCheckLists &&
        localCheckLists.map((checkList) => (
          <div className={styles.taskCheckList} key={checkList._id}>
            <input
              className={styles.checkList}
              type="checkbox"
              name="checkListCheckBox"
              id={`checkListCheckBox${checkList._id}`}
              checked={
                optimisticUpdates.current[checkList._id] !== undefined
                  ? optimisticUpdates.current[checkList._id]
                  : checkList.isCompleted
              }
              onChange={(e) => {
                handleCheckListChange(checkList._id, e.target.checked);
              }}
            />
            <label
              htmlFor={`checkListCheckBox${checkList._id}`}
              className={styles.taskCheckListLabel}
            >
              {checkList.title}
            </label>
          </div>
        ))}
    </>
  );
}

export default CheckList;
