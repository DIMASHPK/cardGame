const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const generateRandomValue = ({ yMin = 0, yMax = 4, xMin = 0, xMax = 12 }) => {
  const y = getRandomIntInclusive(yMin, yMax);
  let x = getRandomIntInclusive(xMin, xMax);

  if (y === 4) {
    x = getRandomIntInclusive(0, 1);
  }

  return `${x},${y}`;
};

const getRandomCard = (length = 12) => {
  let cards = [];

  while (length) {
    let randomCard = generateRandomValue({});

    if (!cards.includes(randomCard)) {
      cards = [...cards, randomCard];
      length--;
    }
  }

  return cards;
};

const generateCards = (length = 12) => {
  const randomCardsValues = getRandomCard();

  return Array(length)
    .fill({ havePair: false, isOpen: false, value: '' })
    .map((item, id) => ({ ...item, id, value: randomCardsValues[id] }));
};

export const generateCardsWithPairs = (length = 12) => {
  const originalArray = generateCards(length);
  const copyOfOriginal = JSON.parse(JSON.stringify(originalArray));

  return shuffle(
    [...originalArray, ...copyOfOriginal].map((item, id) => ({ ...item, id }))
  );
};

export const cardResizeHandler = ({
  cardContainerRef = null,
  setCardDimensions: setCardDimensions = () => {},
}) => {
  if (cardContainerRef.current) {
    const { current: cardContainer } = cardContainerRef;

    const card = cardContainer.querySelector('.cardContainer');

    const { width, height } = card.getBoundingClientRect();

    setCardDimensions({ width, height });
  }
};
