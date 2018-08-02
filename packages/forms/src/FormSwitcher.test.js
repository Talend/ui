import React from 'react';
import { shallow } from 'enzyme';
import FormSwitcher from './FormSwitcher';

describe('FormSwitcher', () => {
	it('should render skeleton if props.loading', () => {
		const wrapper = shallow(<FormSwitcher loading />);
		expect(wrapper.find('FormSkeleton').length).toBe(1);
	});

	it('should render UIForm when uiSchema is an array', () => {
		const wrapper = shallow(<FormSwitcher data={{ uiSchema: [] }} />);
		expect(wrapper.find('Form').length).toBe(0);
		expect(wrapper.find('UIForm').length).toBe(1);
	});

	it('should render old RFSJ when uiSchema is an object', () => {
		const wrapper = shallow(<FormSwitcher data={{ uiSchema: {} }} />);
		expect(wrapper.find('Form').length).toBe(1);
		expect(wrapper.find('UIForm').length).toBe(0);
	});
});
