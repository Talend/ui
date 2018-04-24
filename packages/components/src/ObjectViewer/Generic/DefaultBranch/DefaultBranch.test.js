import React from 'react';
import { shallow } from 'enzyme';
import Component from './DefaultBranch.component';

describe('DefaultLeaf', () => {
	it('should render', () => {
		const wrapper = shallow(<Component />);
		expect(wrapper).toMatchSnapshot();
	});
});
