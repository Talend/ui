import React from 'react';
import { shallow } from 'enzyme';
import Tag from './Tag.component';

describe('Tag', () => {
	const props = {
		children: 'The lazy quick brown fox jumps over the lazy dog',
	};

	it('should render', () => {
		const wrapper = shallow(<Tag {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
