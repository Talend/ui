import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button field', () => {
	const schema = {
		description: 'Click here to trigger a trigger',
		title: 'Boom !',
		triggers: ['after'],
		type: 'button',
	};

	it('should render button', () => {
		// when
		const wrapper = shallow(
			<Button
				id={'myForm'}
				isValid
				errorMessage={'This is wrong'}
				onTrigger={jest.fn()}
				schema={schema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render error button if it is not valid', () => {
		// when
		const wrapper = shallow(
			<Button
				id={'myForm'}
				isValid={false}
				errorMessage={'This is wrong'}
				onTrigger={jest.fn()}
				schema={schema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should call trigger on button click', () => {
		// given
		const onTrigger = jest.fn();
		const wrapper = shallow(
			<Button
				id={'myForm'}
				isValid={false}
				errorMessage={'This is wrong'}
				onTrigger={onTrigger}
				schema={schema}
			/>
		);
		const event = { button: 1 };

		// when
		wrapper.find('button').simulate('click', event);

		// then
		expect(onTrigger).toHaveBeenCalledWith(event, schema.triggers[0], schema);
	});
});
