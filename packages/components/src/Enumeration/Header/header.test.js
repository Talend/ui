import React from 'react';
import { mount } from 'enzyme';
import { Button } from '@talend/react-bootstrap';

import Header from './Header.component';

describe('Header', () => {
	it('should trigger callback when clicking on header button', () => {
		// given
		const props = {
			headerDefault: [
				{
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInstance = <Header {...props} />;

		// when
		const wrapper = mount(headerInstance);
		const buttons = wrapper.find(Button);

		buttons.at(0).simulate('click', { stopPropagation: () => {} });

		// then
		expect(buttons.length).toBe(1);
		expect(props.headerDefault[0].onClick).toBeCalled();
	});
	it('should not render disabled button', () => {
		// given
		const props = {
			headerDefault: [
				{
					disabled: true,
					label: 'Add item',
					icon: 'talend-plus',
					id: 'add',
					onClick: jest.fn(), // provided click callback
				},
			],
		};
		const headerInstance = <Header {...props} />;

		// when
		const wrapper = mount(headerInstance);
		const buttons = wrapper.find(Button);

		// then
		expect(buttons.length).toBe(0);
	});
});
