import React from "react";
import styles from "./Button.module.css";

function Button({ name, type, onClick }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${
          type === "primary" ? styles.primaryButton : styles.secondaryButton
        }`}
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
