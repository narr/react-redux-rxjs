import { shallow } from 'enzyme';
import * as React from 'react';
import TestButton from './TestButton';

describe('<TestButton />', () => {
  it('renders children when passed in', () => {
    const mockFn = jest.fn();
    const childrenProp = 'this is children text';
    const wrapper = shallow(
      <TestButton onClick={mockFn}>{childrenProp}</TestButton>
    );
    expect(wrapper.render().text()).toBe(childrenProp);
  });
});
