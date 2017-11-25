// @flow

import { jsdom } from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const document = jsdom();
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
