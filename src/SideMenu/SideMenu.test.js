import React from 'react';
import { shallow } from 'enzyme';

import SideMenu from './SideMenu.component';

describe('SideMenu', () => {
  it('should render its name', () => {
    const wrapper = shallow(<SideMenu name="Hello world" />);
    expect(wrapper.containsMatchingElement(<div>Hello world</div>)).toBe(true);
  });
});
