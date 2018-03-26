import { PLAYER, DEALER } from "../../constants";

export function createGame() {
  return (dispatch, getState) => {
    dispatch({ type: 'GAME_CREATE' });

    const state = getState();
    const gameId = state.game.activeGame;

    dispatch({ type: 'GAME_HIT', payload: { gameId, who: PLAYER } });
    dispatch({ type: 'GAME_HIT', payload: { gameId, who: DEALER } });
    dispatch({ type: 'GAME_HIT', payload: { gameId, who: PLAYER } });
    dispatch({ type: 'GAME_HIT', payload: { gameId, who: DEALER } });
  }
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