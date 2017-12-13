import React from 'react';
import { shallow } from 'enzyme';

import Message from './Message.component';

describe('Message component', () => {
	it('should render provided description if the field is valid', () => {
		// when
		const wrapper = shallow(
			<Message
			errorMessage={'My error message'}
			description={'My description'}
			isValid
		/>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided error message if the field is invalid', () => {
		// when
		const wrapper = shallow(
			<Message
				errorMessage={'My error message'}
				description={'My description'}
				isValid={false}
			/>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render nothing when field is valid and no description is provided', () => {
		// when
		const wrapper = shallow(
			<Message
				errorMessage={'My error message'}
				isValid
			/>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
