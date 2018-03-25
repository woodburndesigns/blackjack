import { combineReducers } from 'redux';
import game from './gameReducer';
import player from './playerReducer';

const reducers = combineReducers({
  game,
  player,
});

export default reducers;