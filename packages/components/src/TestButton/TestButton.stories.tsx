import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { action } from '@storybook/addon-actions';
import { color, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import myTheme from '../Theme';
import TestButton from './TestButton';

storiesOf('TestButton', module)
  .add('default', () => {
    const scope = { action, TestButton, color, text };
    const code = `
      <TestButton className="abcd" onClick={action('TestButton-clicked')}>
        {text('Label', 'Hello Storybook')}
      </TestButton>
    `;
    return (
      <div
        className="wrapper"
        style={{ border: '1px solid #eee', padding: '20px' }}
      >
        <LiveProvider scope={scope} code={code}>
          <LiveEditor />
          <br />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <div className="for-prop-types" style={{ display: 'none' }}>
          <TestButton onClick={action('')}>&nbsp;</TestButton>
        </div>
      </div>
    );
  })
  .add('override CSS', () => {
    const noop = () => '';

    const scope = {
      MuiThemeProvider,
      TestButton,
      myTheme,
      noop,
      withStyles,
    };
    const code = `
      // This code should be JS not Typescript

      const muiStyles = {
        root: {
          padding: '15px',
        },
        wrapper: {
          padding: '15px',
          color: 'purple',
        }
      };
      function ClassesNesting(props) {
        return <TestButton {...props} />;
      }
      const MyButton = withStyles(muiStyles)(ClassesNesting);

      render(
        <MuiThemeProvider theme={myTheme.dark}>
          <MyButton onClick={noop}>
            <span role="img" aria-label="so cool">
              😀 😎 👍 💯
            </span>
          </MyButton>
        </MuiThemeProvider>
      );
    `;

    return (
      <div className="wrapper" style={{ background: '#444', padding: '20px' }}>
        <LiveProvider scope={scope} code={code} noInline={true}>
          <LiveEditor />
          <br />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <div className="for-prop-types" style={{ display: 'none' }}>
          <TestButton onClick={noop}>&nbsp;</TestButton>
        </div>
      </div>
    );
  });
