import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import SkipLinks from './SkipLinks.component';

describe('Skip links', () => {
	it('should render default layout links', () => {
		// when
		const wrapper = mount(<SkipLinks.WrappedComponent />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render custom links', () => {
		// when
		const wrapper = mount(
			<SkipLinks.WrappedComponent mainId="#my-custom-main-id" navigationId="#my-custom-nav-id" />,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
