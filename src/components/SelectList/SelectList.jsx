import React, { useState, useEffect } from "react";
import styles from "./SelectList.module.css"; // Import the CSS file

const SelectList = ({ defaultValue, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.selectContainer}>
      <select id="select-list" value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectList;
