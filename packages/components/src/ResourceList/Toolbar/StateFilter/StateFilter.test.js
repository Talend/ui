import React from 'react';
import { Button } from '@talend/react-bootstrap';
import { mount } from 'enzyme';
import StateFilter, { TYPES } from './StateFilter.component';

describe('StateFilter', () => {
	it('should trigger onChange callback with the new state on click', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<StateFilter onChange={onChange} types={[TYPES.FAVORITES, TYPES.CERTIFIED]} certified />,
		);

		expect(onChange).not.toBeCalled();

		wrapper
			.find(Button)
			.at(0)
			.simulate('click');
		expect(onChange).toBeCalledWith(TYPES.CERTIFIED, false);

		wrapper
			.find(Button)
			.at(1)
			.simulate('click');
		expect(onChange).toBeCalledWith(TYPES.FAVORITES, true);
	});
});
