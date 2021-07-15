import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Template from 'Template';
import styles from './styles.module.css';
import { useHistory } from 'react-router';
import CONFIG from 'configs';
import { reset } from 'redux/game';
import Button from 'components/Button';

const Result = memo(() => {
  const { userName, scores, lastScore, gameStatus } = useSelector(
    ({ game }) => game
  );

  const dispatch = useDispatch();

  const { push } = useHistory();

  const { ROUTES } = CONFIG;

  const handleRepeatClick = useCallback(() => {
    push(ROUTES.GAME);
  }, [ROUTES.GAME, push]);

  const handleResetClick = useCallback(() => {
    localStorage.removeItem('username');

    dispatch(reset());

    push(ROUTES.MAIN);
  }, [ROUTES.MAIN, dispatch, push]);

  return (
    <Template>
      <section className={styles.scoresContainer}>
        <div className={styles.scoresContainer_wrapper}>
          <h1 className={styles.scoresContainer_mainTitle}>Scores table</h1>
          {Boolean(gameStatus.length) && (
            <div className={styles.scoresContainer_lastGameInfoContainer}>
              <h2
                className={styles.scoresContainer_lastGameInfoContainer_title}
              >
                {gameStatus}
              </h2>
              <div
                className={styles.scoresContainer_lastGameInfoContainer_info}
              >
                <p>Username: {userName}</p>
                <p>score: {lastScore}</p>
              </div>
            </div>
          )}
          <div className={styles.table}>
            {scores.map(({ score, userName, gameStatus, id }) => (
              <div className={styles.tableRow} key={id}>
                <div className={styles.tableCell}>{userName}</div>
                <div className={styles.tableCell}>{gameStatus}</div>
                <div className={styles.tableCell}>{score}</div>
              </div>
            ))}
          </div>
          <div className={styles.scoresContainer_lastGameInfoContainer_actions}>
            <Button onClick={handleResetClick}>Reset</Button>
            <Button onClick={handleRepeatClick}>Repeat</Button>
          </div>
        </div>
      </section>
    </Template>
  );
});

Result.displayName = 'Result';

export default Result;
