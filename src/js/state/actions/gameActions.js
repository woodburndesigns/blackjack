import api from '../../helpers/api';

export function fetchGames() {
  
}

export function createGame() {
  const game = api.games.create();

  return {
    type: 'GAME_CREATE',
    payload: { game }
  }
}

export function hit(gameId, who) {
  return {
    type: 'GAME_HIT',
    payload: {
      gameId,
      who,
    }
  }
}

export function stand(gameId) {
  return {
    type: 'GAME_STAND',
    payload: {
      gameId,
    }
  }
}