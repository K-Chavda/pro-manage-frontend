import React from "react";
import styles from "./Input.module.css";

// Icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function Input({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  readonly = false,
}) {
  const [showPassword, setShowPassword] = React.useState(type === "password");

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.inputContainer}>
      <span className={styles.iconContainer}>{icon}</span>
      <input
        className={styles.inputField}
        type={
          type === "password" ? (showPassword ? "password" : "text") : "text"
        }
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      {type === "password" && (
        <span className={styles.showPassword} onClick={handleClick}>
          {showPassword ? <VscEyeClosed /> : <VscEye />}
        </span>
      )}
    </div>
  );
}

export default Input;
