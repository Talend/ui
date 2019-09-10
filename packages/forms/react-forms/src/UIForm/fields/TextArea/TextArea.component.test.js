import React from 'react';
import { shallow } from 'enzyme';

import TextArea from './TextArea.component';

describe('TextArea field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		key: ['user', 'comment'],
		placeholder: 'Type something here',
		required: true,
		title: 'My input title',
		type: 'text',
	};

	it('should render textarea', () => {
		// when
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled textarea', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render readonly textarea', () => {
		// given
		const readOnlySchema = {
			...schema,
			readOnly: true,
		};

		// when
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={readOnlySchema}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render provided rows', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schemaWithRows}
				value={'toto'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={onChange}
				onFinish={jest.fn()}
				schema={schema}
				value={'toto'}
			/>,
		);
		const value = 'totoa';
		const event = { target: { value } };

		// when
		wrapper.find('textarea').simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { schema, value });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const onFinish = jest.fn();
		const wrapper = shallow(
			<TextArea
				id={'myForm'}
				isValid
				errorMessage={'My error message'}
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value={'toto'}
			/>,
		);
		const value = 'totoa';
		const event = { target: { value } };

		// when
		wrapper.find('textarea').simulate('blur', event);

		// then
		expect(onFinish).toBeCalledWith(event, { schema });
	});
});
