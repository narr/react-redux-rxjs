// @flow

import './App.scss';
import logo from 'public/assets/img/logo.svg';

import React, { Component } from 'react';

import AppHeader from '../components/AppHeader';
import AppIntro from '../components/AppIntro';

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <AppHeader logo={logo}></AppHeader>
        <AppIntro></AppIntro>
      </div>
    );
  }
}

export default App;
