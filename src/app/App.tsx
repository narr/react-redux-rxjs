import * as React from 'react';
import { hot } from 'react-hot-loader';

import TestButtonBase from 'pkg-components/TestButtonBase';

function emtpyFn() {
  return;
}

const App = () => (
  <TestButtonBase onClick={emtpyFn}>Test Button Base</TestButtonBase>
);

let Root: () => JSX.Element;
if (process.env.NODE_ENV === 'development') {
  Root = hot(module)(App);
} else {
  Root = App;
}

export default Root;
