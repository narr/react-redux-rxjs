import { mount } from 'enzyme';
import * as nock from 'nock';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { apiContextPath, APP_LOADED, loadInitData } from 'shared-root/index';
import { rootEpic } from '../../ducks';
import RootContainer from './RootContainer';

describe('<RootContainer />', () => {
  let store: MockStoreEnhanced;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="spinner"></div>
    `;

    const epicMiddleware = createEpicMiddleware();
    const mockStore = configureStore([epicMiddleware]);

    store = mockStore((actions: any[]) => {
      let nextState;
      const lastAction = actions[actions.length - 1];
      if (lastAction && lastAction.type === APP_LOADED) {
        nextState = {
          appLoaded: true,
          phones: lastAction.payload.phones,
          selectedPhone: lastAction.payload.selectedPhone,
        };
      } else {
        nextState = { appLoaded: false };
      }
      return nextState;
    });
    epicMiddleware.run(rootEpic);
    jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should stop the init spinner when the app is loaded', done => {
    nock('http://localhost')
      .get(`${apiContextPath}/assets/json/phones/motorola-xoom-with-wi-fi.json`)
      .reply(200, { value1: 12 });
    nock('http://localhost')
      .get(`${apiContextPath}/assets/json/phones/phones.json`)
      .reply(200, { value2: 34 });

    const spinnerElName = 'spinner';
    const spinnerElSelector = `.${spinnerElName}`;

    mount(
      <Provider store={store}>
        <RootContainer initSpinnerSelector={spinnerElSelector} />
      </Provider>
    );

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(loadInitData());
      const spinnerEl = document.querySelector(
        spinnerElSelector
      ) as HTMLElement;
      const isSpinnerElHidden = spinnerEl.style.display === 'none';
      expect(isSpinnerElHidden).toBe(true);
      done();
    }, 1000);
  });

  it('should not stop the init spinner when a wrong selector is provided', () => {
    const spinnerElName = 'spinner';
    const spinnerElSelector = `.${spinnerElName}`;

    mount(
      <Provider store={store}>
        <RootContainer initSpinnerSelector={spinnerElSelector + '-test'} />
      </Provider>
    );

    const spinnerEl = document.querySelector(spinnerElSelector) as HTMLElement;
    const isSpinnerElHidden = spinnerEl.style.display === 'none';
    expect(isSpinnerElHidden).toBe(false);
  });
});
