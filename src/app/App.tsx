import * as React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import TestButtonBase from 'pkg-components/TestButtonBase';
import * as logo from 'proj-root/assets/img/narr.png';
import * as bigImg from 'proj-root/assets/img/phones/nexus-s.0.jpg';
import { commonStyle } from 'shared-root/index';

function emtpyFn() {
  return;
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid black;
`;

const BigImg = styled.div`
  background-image: url("${bigImg}");
  width: 400px;
  height: 400px;
  border: 2px solid blue;
`;

const materialIconsStyle = commonStyle.getStyleAsString(
  commonStyle.materialIcons
);

const Icon = styled.i`
  ${materialIconsStyle};
`;

const App = () => (
  <React.Fragment>
    <TestButtonBase onClick={emtpyFn}>Test Button Base</TestButtonBase>
    <Img src={logo} alt="logo" />
    <BigImg />
    <Icon>face</Icon>
  </React.Fragment>
);

let Root: () => JSX.Element;
if (process.env.NODE_ENV === 'development') {
  Root = hot(module)(App);
} else {
  Root = App;
}

export default Root;
