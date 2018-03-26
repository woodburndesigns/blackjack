class Deck {
  constructor() {
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    this.deck = [];

    function getValue(card) {
      let value;
      const tens = ['J', 'Q', 'K'];

      if (tens.indexOf(card) >= 0) {
        value = 10;
      } else if (card === 'A') {
        // Technically aces are 11 or 1. However, we handle this difference in calculateScore 
        value = 11;
      } else {
        value = card;
      }

      return value;
    }

    suits.forEach(suit => {
      cards.forEach(card => {
        const value = getValue(card);

        this.deck.push({ card, suit, value });
      });
    });
  }

  deal() {
    const deckSize = this.deck.length;
    const cardIndex = Math.floor(Math.random() * deckSize);
    let card;

    if (this.deck[cardIndex]) {
      card = this.deck.splice(cardIndex, 1)[0];
    }

    return card;
  }
}

export default Deck;