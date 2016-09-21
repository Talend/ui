import React from 'react';
import { mount } from 'enzyme';
import {
  FormControl,
  Checkbox,
} from 'react-bootstrap';
import Form from '../src/Form';

const schema = {
	title: 'TestForm',
	type: 'object',
	properties: {
		name: {
			type: 'string',
			title: 'Name',
			default: 'John Doe',
		},
		admin: {
			type: 'boolean',
			title: 'Admin',
			default: true,
		},
		roles: {
			type: 'string',
			enum: ['dev', 'pm'],
			enumName: ['Developer', 'Project Manager'],
		},
	},
};

describe('<Form/>', () => {
	let wrapper;
	const onSubmit = jest.fn();
	const onChange = jest.fn();

	beforeEach(() => {
		wrapper = mount(<Form schema={schema} onSubmit={onSubmit} onChange={onChange} />);
	});

	it('Renders the <FormControl/> component', () => {
		expect(wrapper.containsMatchingElement(<FormControl />)).toBe(true);
	});
	it('Renders the <Checkbox/> component', () => {
		expect(wrapper.containsMatchingElement(<Checkbox />)).toBe(true);
	});

	it('Renders the <FormControl/> component', () => {
		expect(wrapper.containsMatchingElement(<FormControl />)).toBe(true);
	});

	// TODO: Follow what's happeing on https://github.com/airbnb/enzyme/issues/364
	// and update accordingly.
	// So far it's not possible to get the onChange method to be bubbled up to the
	// form
	xit('Handles changes', () => {
		const input = wrapper.find('input').first();
		input.simulate('change', { target: { value: 'Test' } });
		expect(input.props().value).toEqual('Test');
	// expect(onChange.mock.calls.length).toEqual(1);
	});
	it('Handles submit', () => {
		wrapper.simulate('submit');
		expect(onSubmit.mock.calls.length).toEqual(1);
	});
});
