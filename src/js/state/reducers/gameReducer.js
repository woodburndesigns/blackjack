import clone from 'clone';
import Deck from '../../helpers/Deck';

const initialState = {
  activeGame: null,
  deck: new Deck(),
  games: {},
};

const calculateScore = function(hand) {
  const score = hand.reduce((acc, cur) => {
    let curValue = cur.value;
    
    if (Array.isArray(curValue)) {
      if ((curValue[1] + acc) <= 21) {
        curValue = curValue[1];
      } else {
        curValue = curValue[0];
      }
    }

    return acc + curValue;
  }, 0);

  return score;
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_CREATE': {
      state = clone(state);
      const game = action.payload.game;

      game.player.hand.push(state.deck.deal());
      game.dealer.hand.push(state.deck.deal());
      game.player.hand.push(state.deck.deal());
      game.dealer.hand.push(state.deck.deal());

      game.player.score = calculateScore(game.player.hand);

      state.games[game.id] = game;

      state.activeGame = game.id;
      break;
    }
    case 'GAME_HIT': {
      state = clone(state);
      const { gameId, who } = action.payload;

      const game = state.games[gameId];

      game[who].hand.push(state.deck.deal());
      game[who].score = calculateScore(game[who].hand);

      break;
    }
    case 'GAME_STAND': {
      state = clone(state);
      const { gameId } = action.payload;

      state.games[gameId].player.stand = true;
      break;
    }
    default:
  }

  return state;
}

export default gameReducer;