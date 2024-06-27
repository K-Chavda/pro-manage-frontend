import React from "react";
import styles from "../TaskCard/TaskCard.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskCardSkeleton() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeaderContainer}>
          <div className={styles.taskPriorityAndActionsContainer}>
            <Skeleton
              containerClassName={
                styles.taskPriorityAndInitialContainerSkeleton
              }
            />
            <Skeleton
              containerClassName={styles.taskActionsContainerSkeleton}
            />
          </div>
          <Skeleton containerClassName={styles.taskTitleContainerSkeleton} />
        </div>
        <div className={styles.taskCheckListContainer}>
          <div className={styles.checkListExpand}>
            <Skeleton
              containerClassName={styles.checkListCountContainerSkeleton}
            />
            <Skeleton
              containerClassName={styles.checkListExpandIconContainerSkeleton}
            />
          </div>
          <Skeleton containerClassName={styles.checkListContainerSkeleton} />
        </div>
        <div className={styles.taskDueDateAndStatusContainer}>
          <Skeleton containerClassName={styles.taskDueDateContainerSkeleton} />
          <Skeleton containerClassName={styles.taskStatusContainerSkeleton} />
        </div>
      </div>
    </>
  );
}

export default TaskCardSkeleton;
