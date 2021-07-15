import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

const Button = memo(props => {
  const { children, onClick, className, disabled, ...restProps } = props;

  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  disabled: false,
  onClick: () => {},
};

Button.displayName = 'Button';

export default Button;
