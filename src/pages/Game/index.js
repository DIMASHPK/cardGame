import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import Template from 'Template/index';
import { useHistory } from 'react-router';
import CONFIG from 'configs';
import { cardResizeHandler } from 'utils/cards';
import Card from './Card';
import { useGame } from './hooks/useGame';
import Button from 'components/Button';

const Game = memo(() => {
  const { userName } = useSelector(({ game }) => game);

  const [showCards, setShowCards] = useState(false);

  const ref = useRef();

  const { push } = useHistory();

  const { ROUTES } = CONFIG;

  const [cardDimension, setCardDimensions] = useState({ height: 0, width: 0 });

  const { handleCardClick, cards, score } = useGame();

  const handleToggleCards = useCallback(
    () => setShowCards(prevValue => !prevValue),
    []
  );

  const renderCard = card => (
    <Card
      key={card.id}
      {...card}
      onClick={handleCardClick}
      cardDimension={cardDimension}
      showCards={showCards}
    />
  );

  const handleResize = () =>
    cardResizeHandler({ cardContainerRef: ref, setCardDimensions });

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!userName.length) {
    push(ROUTES.MAIN);
    return null;
  }

  return (
    <Template>
      <div className={styles.gameContainer}>
        <div className={styles.gameContainer_gameInfo}>
          <div className={styles.gameContainer_gameInfo_titleContainer}>
            <h1>Find Pairs</h1>
          </div>
          <p>You need to find 12 pairs of cards to win this game</p>
          <div className={styles.gameContainer_gameInfo_userInfo}>
            <span>USER NAME: {userName}</span>
            <span>SCORE: {score}</span>
          </div>
        </div>
        <div className={styles.gameContainer_actionsWrapper}>
          <Button onClick={handleToggleCards}>show cards</Button>
        </div>
        <div className={styles.gameContainer_cardsContainer} ref={ref}>
          {cards.map(renderCard)}
        </div>
      </div>
    </Template>
  );
});

Game.displayName = 'Game';

export default Game;
