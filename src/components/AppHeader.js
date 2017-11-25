// @flow

import React from 'react';
import './AppHeader.scss';

type Props = {
  logo: string,
};

function AppHeader(props: Props) {
  return (
    <header styleName="App-header">
      <img src={props.logo} styleName="App-logo" alt="logo" />
      <h1 styleName="App-title">Welcome to React</h1>
    </header>
  );
}

export default AppHeader;
