import React, { memo } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const Template = memo(({ children }) => (
  <section className={styles.mainSectionWrapper}>{children}</section>
));

Template.displayName = 'Template';

Template.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Template;
