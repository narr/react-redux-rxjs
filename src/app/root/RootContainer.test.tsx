import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { appLoaded, appReducer } from 'shared-root/index';
import RootContainer from './RootContainer';

describe('<RootContainer />', () => {
  const mockStore = configureStore();
  let store: MockStoreEnhanced;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="spinner"></div>
    `;

    jest.useFakeTimers();

    let lastState = {
      loaded: false,
    };
    store = mockStore((actions: any[]) => {
      let nextState;
      const lastAction = actions[actions.length - 1];
      if (lastAction) {
        nextState = appReducer(lastState, lastAction);
      } else {
        nextState = appReducer(undefined, { type: '' });
      }
      lastState = nextState;
      return {
        appState: nextState,
      };
    });
    jest.spyOn(store, 'dispatch');
  });

  it('should stop the init spinner when the app is loaded', () => {
    const spinnerElName = 'spinner';
    const spinnerElSelector = `.${spinnerElName}`;

    mount(
      <Provider store={store}>
        <RootContainer initSpinnerSelector={spinnerElSelector} />
      </Provider>
    );
    jest.runOnlyPendingTimers();
    expect(store.dispatch).toHaveBeenCalledWith(appLoaded());

    const spinnerEl = document.querySelector(spinnerElSelector) as HTMLElement;
    const isSpinnerElHidden = spinnerEl.style.display === 'none';
    expect(isSpinnerElHidden).toBe(true);
  });

  it('should not stop the init spinner when a wrong selector is provided', () => {
    const spinnerElName = 'spinner';
    const spinnerElSelector = `.${spinnerElName}`;

    mount(
      <Provider store={store}>
        <RootContainer initSpinnerSelector={spinnerElSelector + '-test'} />
      </Provider>
    );
    jest.runOnlyPendingTimers();

    const spinnerEl = document.querySelector(spinnerElSelector) as HTMLElement;
    const isSpinnerElHidden = spinnerEl.style.display === 'none';
    expect(isSpinnerElHidden).toBe(false);
  });
});
