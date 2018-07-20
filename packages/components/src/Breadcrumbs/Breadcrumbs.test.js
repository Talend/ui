import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs.component';

describe('Breadcrumbs', () => {
	it('should trigger action callback on item click', () => {
		// given
		const onTextAClick = jest.fn();
		const onTextBClick = jest.fn();
		const onTextCClick = jest.fn();
		const actions = [
			{ text: 'Text A', onClick: onTextAClick },
			{ text: 'Text B', onClick: onTextBClick },
			{ text: 'Text C', onClick: onTextCClick },
		];
		const clickedElementIndex = 1;

		// when
		const breadcrumbs = <Breadcrumbs items={actions} />;
		const wrapper = mount(breadcrumbs);
		wrapper
			.find('ol')
			.find(Button)
			.at(clickedElementIndex)
			.simulate('click');

		// then
		expect(onTextAClick).not.toBeCalled();
		expect(onTextBClick).toBeCalled();
		expect(onTextCClick).not.toBeCalled();

		const callArgs = onTextBClick.mock.calls[0];
		expect(callArgs[1]).toBe(actions[clickedElementIndex]);
	});
});
