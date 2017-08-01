import React from 'react';
import { shallow, mount } from 'enzyme';

import CheckBoxes from './CheckBoxes.component';

describe('CheckBoxes field', () => {
	const schema = {
		description: 'my checkbox input hint',
		title: 'My checkboxes title',
		titleMap: [
			{ name: 'My foo title', value: 'foo' },
			{ name: 'My bar title', value: 'bar' },
			{ name: 'My lol title', value: 'lol' },
		],
		type: 'checkbox',
	};

	it('should render checkboxes', () => {
		// given
		const values = ['foo', 'bar'];

		// when
		const wrapper = shallow(
			<CheckBoxes
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={schema}
				values={values}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render checkboxes with no values', () => {
		// when
		const wrapper = shallow(
			<CheckBoxes
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={schema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should render disabled checkboxes', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(
			<CheckBoxes
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				schema={disabledSchema}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('#onChange', () => {
		it('should trigger callback, adding a value to existing values', () => {
			// given
			const values = ['foo', 'bar'];
			const onChange = jest.fn();
			const wrapper = mount(
				<CheckBoxes
					id={'myForm'}
					isValid
					errorMessage={'My error message'}
					onChange={onChange}
					schema={schema}
					value={values}
				/>
			);
			const event = { target: { checked: true } };

			// when
			wrapper.find('input').at(2).simulate('change', event);

			// then
			expect(onChange).toBeCalledWith(
				expect.anything(),
				{ schema, value: ['foo', 'bar', 'lol'] }
			);
		});

		it('should trigger callback, adding a value to undefined values', () => {
			// given
			const onChange = jest.fn();
			const wrapper = mount(
				<CheckBoxes
					id={'myForm'}
					isValid
					errorMessage={'My error message'}
					onChange={onChange}
					schema={schema}
				/>
			);
			const event = { target: { checked: true } };

			// when
			wrapper.find('input').at(2).simulate('change', event);

			// then
			expect(onChange).toBeCalledWith(
				expect.anything(),
				{ schema, value: ['lol'] }
			);
		});

		it('should trigger callback, removing a value to existing multi values', () => {
			// given
			const values = ['foo', 'bar'];
			const onChange = jest.fn();
			const wrapper = mount(
				<CheckBoxes
					id={'myForm'}
					isValid
					errorMessage={'My error message'}
					onChange={onChange}
					schema={schema}
					value={values}
				/>
			);
			const event = { target: { checked: false } };

			// when
			wrapper.find('input').at(0).simulate('change', event);

			// then
			expect(onChange).toBeCalledWith(
				expect.anything(),
				{ schema, value: ['bar'] }
			);
		});

		it('should trigger callback, removing a value to existing single value', () => {
			// given
			const values = ['foo'];
			const onChange = jest.fn();
			const wrapper = mount(
				<CheckBoxes
					id={'myForm'}
					isValid
					errorMessage={'My error message'}
					onChange={onChange}
					schema={schema}
					value={values}
				/>
			);
			const event = { target: { checked: false } };

			// when
			wrapper.find('input').at(0).simulate('change', event);

			// then
			expect(onChange).toBeCalledWith(
				expect.anything(),
				{ schema, value: undefined },
			);
		});
	});
});
