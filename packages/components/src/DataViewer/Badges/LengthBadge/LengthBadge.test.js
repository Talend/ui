import React from 'react';
import { shallow } from 'enzyme';
import LengthBadge from './LengthBadge.component';

describe('LengthBadge', () => {
	it('should render', () => {
		const wrapper = shallow(<LengthBadge lengthValue={10} className="myCLass" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
