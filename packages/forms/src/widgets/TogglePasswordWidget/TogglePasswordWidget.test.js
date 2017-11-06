import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TogglePasswordWidget from './TogglePasswordWidget';

describe('TogglePasswordWidget', () => {
	it('should render toggle password with type password', () => {
		const value = 'foo-1';
		const type = 'password';

		const wrapper = shallow(
			<TogglePasswordWidget
				value={value}
				type={type}
			/>
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render toggle password with type text', () => {
		const value = 'foo-2';
		const type = 'text';

		const wrapper = shallow(
			<TogglePasswordWidget
				value={value}
				type={type}
			/>
		);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
