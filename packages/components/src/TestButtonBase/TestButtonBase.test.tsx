import { MuiThemeProvider } from '@material-ui/core/styles';
import { mount } from 'enzyme';
import * as React from 'react';
import myTheme from '../Theme';
import TestButtonBase from './TestButtonBase';

describe('<TestButtonBase />', () => {
  it('renders children when passed in', () => {
    const mockFn = jest.fn();
    const children = 'this is children text';
    const wrapper = mount(
      <TestButtonBase onClick={mockFn}>{children}</TestButtonBase>
    );
    expect(wrapper.text()).toBe(children);
  });

  it('renders children with a custom theme', () => {
    const mockFn = jest.fn();
    const children = 'this is children text';
    const wrapper = mount(
      <MuiThemeProvider theme={myTheme.light}>
        <TestButtonBase onClick={mockFn}>{children}</TestButtonBase>
      </MuiThemeProvider>
    );
    expect(wrapper.text()).toBe(children);
  });
});
