import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import clsx from 'clsx';

const Card = memo(props => {
  const {
    havePair,
    isOpen,
    value,
    id,
    onClick,
    showCards,
    cardDimension: { height, width },
  } = props;

  const handleClick = () => onClick({ id, value, isOpen });

  const [x, y] = value.split(',');

  return (
    <div
      className={clsx(
        styles.cardContainer,
        isOpen && styles.opened,
        havePair && styles.havePair
      )}
      onClick={handleClick}
    >
      <div className={styles.cardContainer_frontWrapper}>
        <div
          className={clsx(styles.cardContainer_front, 'cardContainer')}
          style={{
            backgroundSize: `calc(${width}px * 13) calc(${height}px * 5)`,
            backgroundPosition: `calc(${width}px * -${
              showCards ? x : 2
            }) calc(${height}px * -${showCards ? y : 4})`,
          }}
        />
      </div>
      <div className={styles.cardContainer_backWrapper}>
        <div
          className={styles.cardContainer_back}
          style={{
            backgroundSize: `calc(${width}px * 13) calc(${height}px * 5)`,
            backgroundPosition: `calc(${width}px * -${x}) calc(${height}px * -${y})`,
          }}
        >
          <div className={styles.cardContainer_back_havePair}>
            <span>Have pair</span>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  havePair: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  cardDimension: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  showCards: PropTypes.bool.isRequired,
};

export default Card;
