import React from 'react';
import { mount } from 'enzyme';

import Badge from './Badge.component';

describe('Badge', () => {
	it('should render by default', () => {
		// given
		const label = 'my label';

		// when
		const wrapper = mount(<Badge label={label} />);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render the given children', () => {
		// when
		const wrapper = mount(
			<Badge>
				<div test-id="testId">children</div>
			</Badge>,
		);

		// then
		expect(wrapper.find('div[test-id="testId"]').text()).toBe('children');
	});
});
