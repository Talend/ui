import React from 'react';
import { shallow, mount } from 'enzyme';

import SingleButton from './SingleButton.component';

describe('SingleButton field', () => {
	const schema = {
		bsStyle: 'primary',
		title: 'Boom !',
	};

	it('should render button', () => {
		// when
		const wrapper = shallow(
			<SingleButton
				id={'myForm'}
				onTrigger={jest.fn()}
				schema={schema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render submit button', () => {
		// given
		const submitSchema = {
			...schema,
			type: 'submit',
		};

		// when
		const wrapper = shallow(
			<SingleButton
				id={'myForm'}
				onTrigger={jest.fn()}
				schema={submitSchema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render reset button', () => {
		// given
		const resetSchema = {
			...schema,
			type: 'reset',
		};

		// when
		const wrapper = shallow(
			<SingleButton
				id={'myForm'}
				onTrigger={jest.fn()}
				schema={resetSchema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should call trigger on button click', () => {
		// given
		const triggerSchema = {
			...schema,
			triggers: ['after'],
		};
		const onTrigger = jest.fn();
		const wrapper = mount(
			<SingleButton
				id={'myForm'}
				onTrigger={onTrigger}
				schema={triggerSchema}
			/>
		);

		// when
		wrapper.find('button').simulate('click', { button: 1 });

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything(), triggerSchema.triggers[0], triggerSchema);
	});
});
