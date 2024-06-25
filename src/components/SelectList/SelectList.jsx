import { useEffect, useState } from "react";
import styles from "./SelectList.module.css";
import { IoIosArrowDown } from "react-icons/io";

const SelectList = ({ options, value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelect = (option) => {
    onChange(option);
    toggleList();
  };

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectWrapper} onClick={toggleList}>
        <div className={styles.selectedItem}>
          {value ? value : "Select an option"}
        </div>
        <div
          className={`${styles.dropdownIcon} ${
            isExpanded ? styles.expandedIcon : ""
          }`}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <div
        className={`${styles.dropdownContent} ${isExpanded ? styles.show : ""}`}
      >
        {options.map((option) => (
          <div
            key={option}
            className={styles.dropdownItem}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectList;
