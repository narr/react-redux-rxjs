// https://github.com/erikras/ducks-modular-redux

import { Epic, ofType } from 'redux-observable';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { loadInitDataPhones, loadInitDataSelectedPhone } from '../root';

// Actions
const LOAD_INIT_DATA = 'react-redux-rxjs/app/LOAD_INIT_DATA';
export const APP_LOADED = 'react-redux-rxjs/app/APP_LOADED';

export const loadInitData = () => {
  return { type: LOAD_INIT_DATA };
};

interface IappLoadedPayload {
  selectedPhone: object;
  phones: any[];
}

// Action Creators
type TypeAppLoaded = (
  payload: IappLoadedPayload
) => {
  type: string;
  payload: IappLoadedPayload;
};

export const appLoaded: TypeAppLoaded = payload => {
  // tslint:disable-next-line no-console
  console.log(payload);
  return { type: APP_LOADED, payload };
};

interface IappLoadResponse {
  error?: boolean;
}

export const appLoadEpic: Epic = action$ =>
  action$.pipe(
    ofType(LOAD_INIT_DATA),
    switchMap(action => {
      return forkJoin([loadInitDataSelectedPhone(), loadInitDataPhones()]);
    }),
    tap(data => {
      // tslint:disable-next-line no-console
      console.log(data);
    }),
    map((payloads: IappLoadResponse) => {
      const payload = {
        phones: payloads[1].error ? [] : payloads[1],
        selectedPhone: payloads[0].error ? {} : payloads[0],
      };
      return appLoaded(payload);
    })
  );

export interface IactionAppLoaded {
  type: string;
  payload: IappLoadedPayload;
}

// Reducer
export function appLoadedReducer(state = false, action: IactionAppLoaded) {
  switch (action.type) {
    case APP_LOADED:
      return true;
    default:
      return state;
  }
}
