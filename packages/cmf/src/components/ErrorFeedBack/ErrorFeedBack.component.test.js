import React from 'react';
import { shallow, mount } from 'enzyme';
import Component from './ErrorFeedBack.component';

global.window.URL.createObjectURL = jest.fn();

describe('Component ErrorFeedBack', () => {
	it('should render ErrorPanel', () => {
		const errors = [
			{
				foo: 'bar',
			},
		];
		const wrapper = shallow(<Component errors={errors} />);
		const panels = wrapper.find('ErrorPanel');
		expect(panels.length).toBe(1);
		expect(panels.props().error).toEqual(errors[0]);
	});
	it('should add marginTop if full', () => {
		const errors = [
			{
				message: 'Error message',
				name: 'Error name',
				stack: 'Error stack',
			},
		];
		const wrapper = mount(<Component errors={errors} full />);
		expect(wrapper.find('.col-md-6').props().style.marginTop).toBe(200);
	});
	it('should render react fragment if not full', () => {
		const errors = [
			{
				message: 'Error message',
				name: 'Error name',
				stack: 'Error stack',
			},
		];
		const wrapper = shallow(<Component errors={errors} />);
		expect(wrapper.find('Fragment').length).toBe(1);
	});
});
