import React from 'react';
import { shallow, mount } from 'enzyme';

import SingleButton from './SingleButton.component';

describe('SingleButton field', () => {
	const schema = {
		bsStyle: 'primary',
		name: 'my-button',
		title: 'Boom !',
	};

	it('should render button', () => {
		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={schema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render submit button', () => {
		// given
		const submitSchema = {
			...schema,
			type: 'submit',
		};

		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={submitSchema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render submit button with inProgress', () => {
		// given
		const submitSchema = {
			...schema,
			inProgress: true,
			type: 'submit',
		};

		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={submitSchema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render reset button', () => {
		// given
		const resetSchema = {
			...schema,
			type: 'reset',
		};

		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={resetSchema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled button', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={disabledSchema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render inProgress button', () => {
		// given
		const inProgressSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(<SingleButton id={'myForm'} schema={inProgressSchema} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call trigger on button click', () => {
		// given
		const triggerSchema = {
			...schema,
			triggers: ['after'],
		};
		const onTrigger = jest.fn(() => Promise.resolve());
		const wrapper = mount(
			<SingleButton id={'myForm'} onTrigger={onTrigger} schema={triggerSchema} />,
		);

		// when
		wrapper.find('button').simulate('click', { button: 1 });

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), {
			trigger: triggerSchema.triggers[0],
			schema: triggerSchema,
		});
	});
});
