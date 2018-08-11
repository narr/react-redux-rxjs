// https://github.com/erikras/ducks-modular-redux

// Actions
const APP_LOADED = 'react-redux-rxjs/app/APP_LOADED';

// Action Creators
export type TypeAppLoaded = () => { type: string };

export const appLoaded: TypeAppLoaded = () => {
  return { type: APP_LOADED };
};

export interface IappState {
  loaded: boolean;
}

interface Iaction {
  type: string;
}

// Reducer
export default function reducer(
  state: IappState = { loaded: false },
  action: Iaction
) {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
}
