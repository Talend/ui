import React from 'react';
import { shallow } from 'enzyme';

import Code from './Code.component';

describe('Code field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		title: 'My input title',
		type: 'code',
	};

	const props = {
		id: 'myCodeWidget',
		schema,
		onChange: jest.fn(),
		onFinish: jest.fn(),
		value: 'toto',
	};

	it('should render ace-editor in FieldTemplate', () => {
		// when
		const wrapper = shallow(<Code {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = { ...schema, disabled: true };

		// when
		const wrapper = shallow(<Code {...props} schema={disabledSchema} />);

		// then
		expect(wrapper.find('ReactAce').prop('disabled')).toBe(true);
	});

	it('should render readonly input', () => {
		// given
		const readOnlySchema = { ...schema, readOnly: true };

		// when
		const wrapper = shallow(<Code {...props} schema={readOnlySchema} />);

		// then
		expect(wrapper.find('ReactAce').prop('readOnly')).toBe(true);
	});

	it('should trigger onChange', () => {
		// given
		const wrapper = shallow(<Code {...props} />);
		expect(props.onChange).not.toBeCalled();
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('ReactAce').prop('onChange')('totoa', event);

		// then
		expect(props.onChange).toBeCalledWith(event, { schema, value: 'totoa' });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const wrapper = shallow(<Code {...props} />);
		expect(props.onFinish).not.toBeCalled();
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('ReactAce').prop('onBlur')(event);

		// then
		expect(props.onFinish).toBeCalledWith(event, { schema });
	});

	it('should add the field id to the textarea on load', () => {
		// given
		const wrapper = shallow(<Code {...props} />);
		const textAreaSetAttribute = jest.fn();
		const editor = {
			textInput: {
				getElement() {
					return { setAttribute: textAreaSetAttribute };
				},
			},
		};

		// when
		wrapper.find('ReactAce').prop('onLoad')(editor);

		// then
		expect(textAreaSetAttribute).toBeCalledWith('id', props.id);
	});
});
