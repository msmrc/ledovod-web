import React, { useState } from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ label, value, onChange, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={`${styles.input} ${isFocused || value ? styles.inputFocused : ''}`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
      />
      <label className={`${styles.label} ${isFocused || value ? styles.labelFocused : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default TextInput;
