import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { action } from '@storybook/addon-actions';
import { color, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

/**
 * Test build files
 *
 * import everything but use only TestButtonBase
 * import { TestButtonBase } from '../../dist';
 *
 * import only Button and use it
 * import TestButtonBase from '../../dist/TestButtonBase';
 *
 */

// import { TestButtonBase } from '../../dist';
// import TestButtonBase from '../../dist/TestButtonBase';
import myTheme from '../Theme';
import TestButtonBase from './TestButtonBase';

storiesOf('TestButtonBase', module)
  .add('default', () => {
    const scope = {
      MuiThemeProvider,
      TestButtonBase,
      action,
      myTheme,
      text,
    };
    const code = `
      <MuiThemeProvider theme={myTheme.light}>
        <TestButtonBase onClick={action('TestButtonBase-clicked')}>
          {text('Label', 'Hello Storybook')}
        </TestButtonBase>
      </MuiThemeProvider>
    `;
    return (
      <div
        className="wrapper"
        style={{
          background: color('color', '#fff'),
          border: '1px solid #eee',
          padding: '20px',
        }}
      >
        <span className="text">Default Look</span>
        <br />
        <br />
        <LiveProvider scope={scope} code={code}>
          <LiveEditor />
          <br />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <div className="for-prop-types" style={{ display: 'none' }}>
          <TestButtonBase onClick={action('')} />
        </div>
      </div>
    );
  })
  .add('override CSS and add an animation', () => {
    const noop = () => '';

    const scope = {
      MuiThemeProvider,
      TestButtonBase,
      myTheme,
      noop,
      withStyles,
    };
    const code = `
      // This code should be JS not Typescript

      const muiStyles = {
        root: {
          animation: 'my-ani 5s infinite',
        },

        '@keyframes my-ani': {
          from: {
            background: 'red',
          },
          to: {
            background: 'yellow',
          },
        },
      };
      function ClassesNesting(props) {
        const { classes, ...otherProps } = props;
        return <TestButtonBase classes={classes} {...otherProps} />;
      }
      const MyButton = withStyles(muiStyles)(ClassesNesting);

      render(
        <MuiThemeProvider theme={myTheme.light}>
          <MyButton onClick={noop}>{'Hello Storybook'}</MyButton>
        </MuiThemeProvider>
      );
    `;

    return (
      <div
        className="wrapper"
        style={{ border: '1px solid #eee', padding: '20px' }}
      >
        <LiveProvider scope={scope} code={code} noInline={true}>
          <LiveEditor />
          <br />
          <LiveError />
          <LivePreview />
        </LiveProvider>

        <div className="for-prop-types" style={{ display: 'none' }}>
          <TestButtonBase onClick={noop} />
        </div>
      </div>
    );
  });
