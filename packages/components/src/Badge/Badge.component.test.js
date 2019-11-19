import React from 'react';
import { shallow, mount } from 'enzyme';

import BadgeI18n, { Badge } from './Badge.component';

describe('Badge', () => {
	it('should render by default', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<Badge label={label} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with i18n', () => {
		// given nothing
		// when
		const wrapper = shallow(<BadgeI18n />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the given children', () => {
		// Given
		const Children = () => <div test-id="testId">children</div>;
		// When
		const wrapper = mount(
			<Badge>
				<Children />
			</Badge>,
		);
		// Then
		expect(wrapper.find('div[test-id="testId"]').text()).toBe('children');
	});
});
