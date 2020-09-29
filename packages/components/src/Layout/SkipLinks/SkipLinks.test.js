import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import SkipLinks from './SkipLinks.component';

describe('Skip links', () => {
	it('should render only main link', () => {
		// when
		const wrapper = mount(<SkipLinks mainId="#my-custom-main-id" />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render navigation link', () => {
		// when
		const wrapper = mount(
			<SkipLinks mainId="#my-custom-main-id" navigationId="#my-custom-nav-id" />,
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
