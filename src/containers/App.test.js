// @flow

import { jsdom } from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import phones from 'public/assets/json/phones.json';

it('renders without crashing', () => {
  fetch.mockResponse(JSON.stringify(phones));

  const document = jsdom();
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
