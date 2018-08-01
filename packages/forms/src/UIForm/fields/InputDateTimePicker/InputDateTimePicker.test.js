import React from 'react';
import { shallow } from 'enzyme';

import InputDateTimePicker from './InputDateTimePicker.component';

const schema = {
	autoFocus: true,
	description: 'This is my date picker',
	disabled: false,
	placeholder: 'Type here',
	readOnly: false,
	title: 'My date picker',
	type: 'number',
};

describe('InputDateTimePicker', () => {
	it('should render', () => {
		const wrapper = shallow(
			<InputDateTimePicker
				id="my-datepicker"
				isValid={false}
				errorMessage="You've done something wrong"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={1533884400000}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
