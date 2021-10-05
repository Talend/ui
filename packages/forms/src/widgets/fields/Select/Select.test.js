import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from './Select.component';

describe('Select agnostic widget', () => {
	it('should use the common field template', () => {
		// given
		const props = {
			id: 'test',
			label: 'Test',
			className: 'myCustomClass',
			options: [
				{ value: 'blue', name: 'Blue color' },
				{ value: 'red', name: 'Red color' },
			],
		};
		// when
		const wrapper = shallow(<Select {...props} />);
		// then
		const fieldTemplateProps = wrapper.find('FieldTemplate').props();
		expect(fieldTemplateProps.id).toEqual('test');
		expect(fieldTemplateProps.label).toEqual('Test');
		expect(fieldTemplateProps.error).toBeUndefined();
	});

	it('should render a select', () => {
		// given
		const props = {
			id: 'test',
			name: 'test-name',
			label: 'Test',
			className: 'myCustomClass',
			options: [
				{ value: 'blue', name: 'Blue color' },
				{ value: 'red', name: 'Red color' },
			],
		};
		// when
		const wrapper = mount(<Select {...props} />);
		// then
		const select = wrapper.find('select').getDOMNode();
		expect(select.getAttribute('class')).toEqual('form-control myCustomClass');
		expect(select.getAttribute('name')).toEqual('test-name');
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
			options: [
				{ value: 'blue', name: 'Blue color' },
				{ value: 'red', name: 'Red color' },
			],
		};
		// when
		const wrapper = mount(<Select {...props} />);
		// then
		const select = wrapper.find('select').getDOMNode();
		expect(select.getAttribute('aria-invalid')).toBeTruthy();
		expect(select.getAttribute('aria-required')).toBeTruthy();
		expect(select.getAttribute('aria-describedby')).toBe('test-description test-error');
	});
});
