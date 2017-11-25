// @flow

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<App />, root);
}

registerServiceWorker();
