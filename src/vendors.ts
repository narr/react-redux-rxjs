/* tslint:disable a no-var-requires */

import '@material-ui/core/Button';
import '@material-ui/core/styles';
import * as objectAssign from 'object-assign';
import 'prop-types';
import 'react';
import 'react-dom';
import 'react-hot-loader';
import 'react-redux';
import 'redux';
import 'redux-devtools-extension/developmentOnly';
import 'styled-components';

// @ For IE 11
if (typeof Promise === 'undefined') {
  // From create-react-app
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// From create-react-app
// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = objectAssign;
// For IE 11 @
