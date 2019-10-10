import React from 'react';
import { shallow } from 'enzyme';

import SimpleCheckBox from './SimpleCheckBox.component';

describe('SimpleCheckBox field', () => {
	const schema = {
		autoFocus: true,
		disabled: false,
		required: true,
	};

	it('should render input', () => {
		// when
		const wrapper = shallow(
			<SimpleCheckBox
				describedby={'myForm-description myForm-error'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				id={'myForm'}
				label={'My checkbox custom label'}
				schema={schema}
				value
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(
			<SimpleCheckBox
				describedby={'myForm-description myForm-error'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				id={'myForm'}
				label={'My checkbox custom label'}
				schema={disabledSchema}
				value
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = shallow(
			<SimpleCheckBox
				id={'myForm'}
				label={'My checkbox custom label'}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);
		const event = { target: { checked: false } };

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value: false });
	});

	it('should trigger onFinish on checkbox change', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = shallow(
			<SimpleCheckBox
				id={'myForm'}
				label={'My checkbox custom label'}
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);
		const event = { target: { checked: false } };

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', event);

		// then
		expect(onFinish).toBeCalledWith(event, { schema, value: false });
	});

	describe('data-feature', () => {
		const dataFeature = 'my.custom.feature';

		it('should render checkbox with check data-feature when checkbox is unchecked', () => {
			const wrapper = shallow(
				<SimpleCheckBox
					describedby={'myForm-description myForm-error'}
					onChange={jest.fn()}
					onFinish={jest.fn()}
					id={'myForm'}
					label={'My checkbox custom label'}
					schema={{
						...schema,
						'data-feature': dataFeature,
					}}
				/>,
			);
			expect(wrapper.find(`label[data-feature="${dataFeature}.check"]`).exists()).toBeTruthy();
		});

		it('should render checkbox with uncheck data-feature when checkbox is checked', () => {
			const wrapper = shallow(
				<SimpleCheckBox
					describedby={'myForm-description myForm-error'}
					onChange={jest.fn()}
					onFinish={jest.fn()}
					id={'myForm'}
					label={'My checkbox custom label'}
					schema={{
						...schema,
						'data-feature': dataFeature,
					}}
					value
				/>,
			);
			expect(wrapper.find(`label[data-feature="${dataFeature}.uncheck"]`).exists()).toBeTruthy();
		});
	});
});
