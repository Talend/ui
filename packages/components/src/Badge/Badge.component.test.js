import React from 'react';
import { shallow, mount } from 'enzyme';

import Badge from './Badge.component';

describe('Badge', () => {
	it('should render by default', () => {
		// given
		const label = 'my label';
		// when
		const wrapper = mount(<Badge.WrappedComponent label={label} />);
		// then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render with i18n', () => {
		// given nothing
		// when
		const wrapper = shallow(<Badge />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the given children', () => {
		// Given
		const Children = () => <div test-id="testId">children</div>;
		// When
		const wrapper = mount(
			<Badge.WrappedComponent>
				<Children />
			</Badge.WrappedComponent>,
		);
		// Then
		expect(wrapper.find('div[test-id="testId"]').text()).toBe('children');
	});
});
