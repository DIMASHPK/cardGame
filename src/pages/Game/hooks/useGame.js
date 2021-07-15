import { useCallback, useEffect, useMemo, useState } from 'react';
import CONFIG from 'configs';
import { generateCardsWithPairs } from 'utils/cards';
import { handleGame } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStatus, addLastScore, addScores } from 'redux/game';
import { useHistory } from 'react-router';

export const useGame = () => {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(generateCardsWithPairs());

  const { scores, userName } = useSelector(({ game }) => game);

  const { GAME_STATUSES, ROUTES } = CONFIG;

  const { push } = useHistory();

  const dispatch = useDispatch();

  const isFinish = useMemo(() => {
    const openedCards = cards.filter(({ isOpen }) => isOpen);

    return Boolean(
      (openedCards.length % 2 === 0 &&
        openedCards.some(({ havePair }) => !havePair)) ||
        openedCards.length === cards.length
    );
  }, [cards]);

  const openedCard = useMemo(
    () =>
      cards.find(
        ({ havePair, isOpen }) => havePair === false && isOpen === true
      ),
    [cards]
  );

  const getFilteredScores = useCallback(
    status => {
      let allScores = scores;
      if (scores.length === 10) {
        allScores = scores.slice(0, -1);
      }

      return [...allScores, { score, userName, gameStatus: status }]
        .map((item, id) => ({
          ...item,
          id,
        }))
        .sort((a, b) => b.score - a.score);
    },
    [scores, score, userName]
  );

  const handleFinishGame = useCallback(() => {
    let status = GAME_STATUSES.LOOSE;

    if (cards.every(({ havePair }) => havePair)) {
      status = GAME_STATUSES.WIN;
    }

    const filteredScores = getFilteredScores(status);

    localStorage.setItem('allScores', JSON.stringify(filteredScores));

    dispatch(setGameStatus(status));
    dispatch(addLastScore(score));
    dispatch(addScores(filteredScores));

    push(ROUTES.RESULT);
  }, [
    GAME_STATUSES.LOOSE,
    GAME_STATUSES.WIN,
    ROUTES.RESULT,
    cards,
    dispatch,
    getFilteredScores,
    push,
    score,
  ]);

  const handleCardClick = useCallback(
    ({ id, value, isOpen }) => {
      if (isOpen) return;

      const gameHandlerInit = handleGame({
        cardId: id,
        cardValue: value,
        setScore,
        openedCard,
      });

      setCards(gameHandlerInit);
    },
    [openedCard]
  );

  useEffect(() => {
    if (isFinish) {
      handleFinishGame();
    }
  }, [handleFinishGame, isFinish]);

  return { handleCardClick, cards, score };
};
