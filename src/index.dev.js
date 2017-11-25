// @flow

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

function init() {
  const root = document.getElementById('root');

  if (!root) {
    return;
  }

  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      root,
    );
  };

  render(App);

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      render(App);
    });
  }
}

init();

registerServiceWorker();
