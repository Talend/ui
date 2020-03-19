import React from 'react';
import { shallow, mount } from 'enzyme';
import keyCode from 'keycode';

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
		const wrapper = shallow(<Code.WrappedComponent {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = { ...schema, disabled: true };

		// when
		const wrapper = shallow(<Code.WrappedComponent {...props} schema={disabledSchema} />);

		// then
		expect(wrapper.find('ReactAce').prop('readOnly')).toBe(true);
	});

	it('should render readonly input', () => {
		// given
		const readOnlySchema = { ...schema, readOnly: true };

		// when
		const wrapper = shallow(<Code.WrappedComponent {...props} schema={readOnlySchema} />);

		// then
		expect(wrapper.find('ReactAce').prop('readOnly')).toBe(true);
	});

	it('should trigger onChange', () => {
		// given
		const wrapper = shallow(<Code.WrappedComponent {...props} />);
		expect(props.onChange).not.toBeCalled();
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('ReactAce').prop('onChange')('totoa', event);

		// then
		expect(props.onChange).toBeCalledWith(event, { schema, value: 'totoa' });
	});

	it('should trigger onFinish on input blur', () => {
		// given
		const wrapper = shallow(<Code.WrappedComponent {...props} />);
		expect(props.onFinish).not.toBeCalled();
		const event = { target: { value: 'totoa' } };

		// when
		wrapper.find('ReactAce').prop('onBlur')(event);

		// then
		expect(props.onFinish).toBeCalledWith(event, { schema });
	});

	it('should add the field id to the textarea on load', () => {
		// given
		const wrapper = shallow(<Code.WrappedComponent {...props} />);
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

	it('should focus on the wrapping div on double esc keydown', () => {
		// given
		const containerId = 'myCodeWidget-editor-container';
		const wrapper = mount(<Code.WrappedComponent {...props} />);
		const editor = wrapper.find('#myCodeWidget_wrapper');
		expect(document.activeElement.getAttribute('id')).not.toBe(containerId);

		// when
		editor.simulate('keydown', { keyCode: keyCode.codes.esc });
		expect(document.activeElement.getAttribute('id')).not.toBe(containerId);
		editor.simulate('keydown', { keyCode: keyCode.codes.esc });

		// then
		expect(document.activeElement.getAttribute('id')).toBe(containerId);
	});

	it('should manage tabindex on textarea', () => {
		// given
		const wrapper = mount(<Code.WrappedComponent {...props} />);
		const container = wrapper.find('#myCodeWidget-editor-container');
		const editor = wrapper.find('#myCodeWidget_wrapper');
		const textarea = document.activeElement;
		expect(textarea.getAttribute('tabindex')).not.toBe('-1');

		// when
		editor.simulate('keydown', { keyCode: keyCode.codes.esc });
		editor.simulate('keydown', { keyCode: keyCode.codes.esc });

		// then
		expect(textarea.getAttribute('tabindex')).toBe('-1');

		// when
		container.simulate('blur');

		// then
		expect(textarea.getAttribute('tabindex')).not.toBe('-1');
	});
});
