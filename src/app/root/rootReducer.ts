import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import {
  apiContextPath,
  APP_LOADED,
  IactionAppLoaded,
} from 'shared-root/index';

export function selectedPhoneReducer(state = null, action: IactionAppLoaded) {
  switch (action.type) {
    case APP_LOADED:
      return action.payload.selectedPhone;
    default:
      return state;
  }
}

export function phonesReducer(state = [], action: IactionAppLoaded) {
  switch (action.type) {
    case APP_LOADED:
      return action.payload.phones;
    default:
      return state;
  }
}

export const loadInitDataSelectedPhone = () => {
  return ajax
    .getJSON(
      `${apiContextPath}/assets/json/phones/motorola-xoom-with-wi-fi.json`
    )
    .pipe(
      catchError(error => {
        return of({
          error: true,
          payload: error.xhr,
        });
      })
    );
};

export const loadInitDataPhones = () => {
  return ajax.getJSON(`${apiContextPath}/assets/json/phones/phones.json`).pipe(
    catchError(error => {
      return of({
        error: true,
        payload: error.xhr,
      });
    })
  );
};
