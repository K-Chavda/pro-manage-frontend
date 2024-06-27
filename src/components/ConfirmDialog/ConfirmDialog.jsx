import React, { useState } from "react";
import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({
  message,
  confirmButton,
  closeButton,
  callBack,
  isModelOpen,
  setIsModelOpen,
}) {
  const handleCancelClick = () => {
    setIsModelOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.mainContainer} ${
          !isModelOpen ? styles.confirmDialogModelClose : null
        }`}
      >
        <div className={styles.confirmDialogCard}>
          <div className={styles.confirmDialogContent}>{message}</div>
          <div className={styles.confirmDialogButtonsContainer}>
            <button
              className={`${styles.confirmDialogButton} ${styles.primaryButton}`}
              onClick={callBack}
            >
              {confirmButton}
            </button>
            <button
              className={`${styles.confirmDialogButton} ${styles.secondaryButton}`}
              onClick={handleCancelClick}
            >
              {closeButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmDialog;
