import { combineReducers } from 'redux';
import { appReducer as appState } from './app/shared';

export default combineReducers({
  appState,
});
