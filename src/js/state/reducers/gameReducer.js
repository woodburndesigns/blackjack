import clone from 'clone';
import Deck from '../../helpers/Deck';
import { MAX_HAND, GAME_STATUS, PLAYER, DEALER_MIN_HAND } from '../../constants';

const initialState = {
  activeGame: null,
  deck: new Deck(),
  games: {},
};

const calculateScore = (hand = []) => {
  let score = 0;

  if (hand.length > 0) {
    let aceCount = hand.filter(h => (h.card === 'A')).length;
    score = hand.reduce((acc, cur) => (acc + cur.value), 0);
    
    while (score > MAX_HAND && aceCount > 0) {
      score -= 10;
      aceCount -= 1;
    }
  }

  return score;
}

const didBust = (score = 0) => {
  return score > MAX_HAND;
};

const calculateStatus = (game) => {
  let status = GAME_STATUS.playing;
  const stood = game.player.stand;

  if (didBust(game.player.score)) {
    status = GAME_STATUS.lose;
  } else if (didBust(game.dealer.score)) {
    status = GAME_STATUS.win;
  } else if (stood && game.dealer.score >= DEALER_MIN_HAND) {
    if (game.player.score > game.dealer.score) {
      status = GAME_STATUS.win;
    } else if (game.player.score < game.dealer.score) {
      status = GAME_STATUS.lose;
    } else {
      status = GAME_STATUS.draw;
    }
  }

  return status;
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
          bust: false,
        },
        player: {
          hand: [],
          score: 0,
          bust: false,
          stand: false,
        },
        status: GAME_STATUS.playing,
        created_at: new Date(),
      };

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
      game[who].bust = didBust(game[who].score);
      game.status = calculateStatus(game);

      break;
    }
    case 'GAME_STAND': {
      state = clone(state);
      const { gameId } = action.payload;
      const game = state.games[gameId];

      game.player.stand = true;
      game.status = calculateStatus(game);
      
      break;
    }
    default:
  }

  return state;
}

export default gameReducer;