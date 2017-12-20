import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button.component';

describe('Button field', () => {
	it('should render button wrapped with field template', () => {
		// given
		const schema = {
			description: 'Click here to trigger a trigger',
			title: 'Boom !',
			triggers: ['after'],
			widget: 'button',
		};

		// when
		const wrapper = shallow(
			<Button
				id={'myForm'}
				isValid
				errorMessage={'This is wrong'}
				onTrigger={jest.fn()}
				schema={schema}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
