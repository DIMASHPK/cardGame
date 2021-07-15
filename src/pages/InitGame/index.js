import React, { memo, useCallback, useState } from 'react';
import Template from '../../Template';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername as setUsernameAction } from 'redux/game';
import { useHistory } from 'react-router';
import CONFIG from 'configs/index';
import Button from 'components/Button';
import Input from 'components/TextInput';

const InitGame = memo(() => {
  const { userName: storeUsername } = useSelector(({ game }) => game);

  const [username, setUsername] = useState(storeUsername);

  const dispatch = useDispatch();

  const { push } = useHistory();

  const { ROUTES } = CONFIG;

  const handleChange = useCallback(
    ({ target: { value } }) => setUsername(value),
    []
  );

  const handleClick = useCallback(
    e => {
      e.preventDefault();

      dispatch(setUsernameAction(username));
      localStorage.setItem('username', username);
      push(ROUTES.GAME);
    },
    [ROUTES.GAME, dispatch, push, username]
  );

  return (
    <Template>
      <div className={styles.mainContainer}>
        <form onSubmit={handleClick} className={styles.mainContainer_form}>
          <h1 className={styles.mainContainer_form_title}>Find Pairs</h1>
          <p className={styles.mainContainer_form_subtitle}>
            You need to find 12 pairs of cards to win this game
          </p>
          <Input
            onChange={handleChange}
            value={username}
            placeholder="Enter your username"
          />
          <div className={styles.mainContainer_form_actionWrapper}>
            <Button type="submit" disabled={!username.length}>
              start game
            </Button>
          </div>
        </form>
      </div>
    </Template>
  );
});

InitGame.displayName = 'InitGame';

export default InitGame;
