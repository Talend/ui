import React from 'react';
import { Button } from 'react-bootstrap';
import { mount } from 'enzyme';
import OrderChooser from './OrderChooser.component';

describe('OrderChooser', () => {
	it('should trigger onClick callback on click', () => {
		const onClick = jest.fn();
		const wrapper = mount(<OrderChooser onClick={onClick} asc={false} icon="talend-sort-desc" />);
		expect(onClick).not.toBeCalled();

		wrapper.find(Button).at(0).simulate('click');

		expect(onClick).toBeCalled();
	});
});
