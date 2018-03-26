export function createGame() {
  return { type: 'GAME_CREATE' }
}

export function hit(gameId, who) {
  return {
    type: 'GAME_HIT',
    payload: {
      gameId,
      who,
    } 
  };
}

export function stand(gameId) {
  return {
    type: 'GAME_STAND',
    payload: {
      gameId,
    }
  }
}

export function bust(gameId, who) {
  return {
    type: 'GAME_BUST',
    payload: {
      gameId,
      who,
    }
  }
}

export function win(gameId, who) {
  return {
    type: 'GAME_WIN',
    payload: {
      gameId,
      who,
    }
  }
}