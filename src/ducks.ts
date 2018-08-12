import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { phonesReducer, selectedPhoneReducer } from './app/root';
import { appLoadedReducer, appLoadEpic } from './app/shared';

export const rootEpic = combineEpics(appLoadEpic);

export const rootReducer = combineReducers({
  appLoaded: appLoadedReducer,
  phones: phonesReducer,
  selectedPhone: selectedPhoneReducer,
});
