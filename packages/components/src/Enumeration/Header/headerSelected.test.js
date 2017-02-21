import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import HeaderSelected from './HeaderSelected.component';

describe('Header selected', () => {
	it('should trigger callback when clicking on header action', () => {
		// given
		const props = {
			headerSelected: [{
				disabled: false,
				label: 'Delete',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // provided click callback
			}],
			selectedItems: [{ index: 0 }, { index: 1 }],
		};
		const headerInputInstance = <HeaderSelected{...props} />;

		// when
		const wrapper = mount(headerInputInstance);
		const buttons = wrapper.find(Button);

		buttons.at(0).simulate('click', { stopPropagation: () => {} });

		// then
		expect(props.headerSelected[0].onClick).toBeCalled();
	});
});
