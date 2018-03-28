import Deck from '../src/js/helpers/Deck';

let deck;

beforeEach(() => {
  deck = new Deck();
});

describe('Deck', () => {
  it('should have 52 cards by default', () => {
    expect(deck.deck.length).toEqual(52);
  });

  it('should be able to deal 52 cards', () => {
    while (deck.deck.length) {
      deck.deal();
    }

    expect(deck.deck.length).toEqual(0);
  });

  it('should never deal the same card', () => {
    const cardCount = {};

    while (deck.deck.length) {
      const card = deck.deal();
      const key = `${card.card} ${card.suit}`;

      if (cardCount[key] === undefined) {
        cardCount[key] = 0;
      }

      cardCount[key] += 1;
    }

    const duplicates = Object.keys(cardCount).filter(key => (cardCount[key] > 1));

    expect(duplicates.length).toEqual(0);
  });
});