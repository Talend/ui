import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from './Input.component';

describe('Input agnostic widget', () => {
	it('should use the common field template', () => {
		// given
		const props = {
			id: 'test',
			label: 'Test',
			className: 'myCustomClass',
		};
		// when
		const wrapper = shallow(<Input {...props} />);
		// then
		const fieldTemplateProps = wrapper.find('FieldTemplate').props();
		expect(fieldTemplateProps.id).toEqual('test');
		expect(fieldTemplateProps.label).toEqual('Test');
		expect(fieldTemplateProps.error).toBeUndefined();
	});

	it('should render an input', () => {
		// given
		const props = {
			id: 'test',
			name: 'test-name',
			label: 'Test',
			className: 'myCustomClass',
		};
		// when
		const wrapper = mount(<Input {...props} />);
		// then
		const input = wrapper.find('input').getDOMNode();
		expect(input.getAttribute('class')).toEqual('form-control myCustomClass');
		expect(input.getAttribute('name')).toEqual('test-name');
	});

	it('should ensure a11y', () => {
		// given
		const props = {
			id: 'test',
			name: 'test-name',
			label: 'Test',
			className: 'myCustomClass',
			description: 'this is an error',
			error: 'error label',
			required: true,
		};
		// when
		const wrapper = mount(<Input {...props} />);
		// then
		const input = wrapper.find('input').getDOMNode();
		expect(input.getAttribute('aria-invalid')).toBeTruthy();
		expect(input.getAttribute('aria-required')).toBeTruthy();
		expect(input.getAttribute('aria-describedby')).toBe('test-description test-error');
	});
});
