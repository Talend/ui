import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@talend/react-bootstrap';

import HeaderInput from './HeaderInput.component';

describe('Header input', () => {
	it('should trigger callback when clicking on header button', () => {
		// given
		const props = {
			headerInput: [
				{
					label: 'Abort',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInputInstance = <HeaderInput {...props} />;

		// when
		const wrapper = mount(headerInputInstance);
		const buttons = wrapper.find(Button);

		buttons.at(0).simulate('click', { stopPropagation: () => {} });

		// then
		expect(props.headerInput[0].onClick).toBeCalled();
	});
});
