export const handleGame =
  ({ cardId, cardValue, setScore, openedCard }) =>
  prevState =>
    prevState.map(({ id, value, ...restData }) => {
      if (openedCard && openedCard.value === cardValue && id === cardId) {
        setScore(prevValue => prevValue + 1);
      }

      if (
        openedCard &&
        openedCard.value === cardValue &&
        (id === cardId || openedCard.id === id)
      ) {
        return {
          id,
          value,
          ...restData,
          isOpen: true,
          havePair: true,
        };
      }

      if (id === cardId) {
        return {
          id,
          value,
          ...restData,
          isOpen: true,
        };
      }

      return { id, value, ...restData };
    });
