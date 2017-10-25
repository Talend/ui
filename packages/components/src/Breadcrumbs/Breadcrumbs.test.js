import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';
import faker from 'faker';

import Breadcrumbs from './Breadcrumbs.component';

faker.seed(42);
describe('Breadcrumbs', () => {
	it('should trigger action callback on item click', () => {
		// given
		const onTextAClick = jest.fn();
		const onTextBClick = jest.fn();
		const onTextCClick = jest.fn();
		const actions = [
			{ text: faker.random.word(), onClick: onTextAClick },
			{ text: faker.random.word(), onClick: onTextBClick },
			{ text: faker.random.word(), onClick: onTextCClick },
		];
		const clickedElementIndex = 1;

		// when
		const breadcrumbs = (
			<Breadcrumbs
				items={actions}
			/>
		);
		const wrapper = mount(breadcrumbs);
		wrapper.find('ol').find(Button).at(clickedElementIndex).simulate('click');

		// then
		expect(onTextAClick).not.toBeCalled();
		expect(onTextBClick).toBeCalled();
		expect(onTextCClick).not.toBeCalled();

		const callArgs = onTextBClick.mock.calls[0];
		expect(callArgs[1]).toBe(actions[clickedElementIndex]);
	});
});
