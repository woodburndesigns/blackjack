import clone from 'clone';
import Deck from '../../helpers/Deck';
import { MAX_HAND } from '../../constants';

const initialState = {
  activeGame: null,
  deck: new Deck(),
  games: {},
};

const calculateScore = function(hand = []) {
  let score = 0;

  if (hand.length > 0) {
    score = hand.reduce((acc, cur) => {
      let curValue = cur.value;
      
      if (Array.isArray(curValue)) {
        if ((curValue[1] + acc) <= MAX_HAND) {
          curValue = curValue[1];
        } else {
          curValue = curValue[0];
        }
      }
  
      return acc + curValue;
    }, 0);
  }

  return score;
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_CREATE': {
      state = clone(state);
      
      const gameCount = Object.keys(state.games).length;
      const game = {
        id: gameCount,
        dealer: {
          hand: [],
          score: 0,
        },
        player: {
          hand: [],
          score: 0,
          stand: false,
        },
        created_at: new Date(),
        finished_at: null,
      };

      state.games[game.id] = game;

      game.player.hand.push(state.deck.deal());
      game.dealer.hand.push(state.deck.deal());
      game.player.hand.push(state.deck.deal());
      game.dealer.hand.push(state.deck.deal());

      game.player.score = calculateScore(game.player.hand);
      game.dealer.score = calculateScore(game.dealer.hand);

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
    case 'GAME_BUST': {
      state = clone(state);
      const { gameId, who } = action.payload;
      const game = state.games[gameId];

      game.finished_at = new Date();
      game[who].busted = true;
      break;
    }
    case 'GAME_WIN': {
      state = clone(state);
      const { gameId } = action.payload;
      const game = state.games[gameId];

      game.finished_at = new Date();
      break;
    }
    case 'GAME_UPDATE_SCORE': {
      state = clone(state);
      const { gameId } = action.payload;
      const game = state.games[gameId];

      
    }
    default:
  }

  return state;
}

export default gameReducer;