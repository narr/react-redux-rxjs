import * as React from 'react';
import { hot } from 'react-hot-loader';

import RootContainer from './root';

const App = () => <RootContainer initSpinnerSelector=".init-spinner" />;

let AppHoc: () => JSX.Element;
if (process.env.NODE_ENV === 'development') {
  AppHoc = hot(module)(App);
} else {
  AppHoc = App;
}

export default AppHoc;
