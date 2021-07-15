import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Input = memo(props => {
  const { placeholder, value, onChange } = props;

  return (
    <label className={styles.inputContainer}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        type="text"
        placeholder=" "
      />
      <span className={styles.inputPlaceholder}>{placeholder}</span>
    </label>
  );
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.displayName = 'Input';

export default Input;
