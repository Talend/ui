import React from 'react';
import { shallow } from 'enzyme';
import TogglePasswordWidget from './TogglePasswordWidget';

describe('TogglePasswordWidget', () => {
	it('should render toggle password with type password', () => {
		const value = 'foo-1';

		const wrapper = shallow(
			<TogglePasswordWidget
				value={value}
			/>
		);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render toggle password with type text', () => {
		const value = 'foo-2';

		const wrapper = shallow(
			<TogglePasswordWidget
				value={value}
			/>
		);
		wrapper.find('Action').at(0).simulate('click');

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
