import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorFeedBack.component';

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
		expect(panels.props()).toEqual(errors[0]);
	});
	it('should add marginTop if one error', () => {
		const errors = [
			{
				foo: 'bar',
			},
		];
		const wrapper = shallow(<Component errors={errors} />);
		expect(wrapper.find('.col-md-6').props().style.marginTop).toBe(200);
	});
	it('should not marginTop if two errors', () => {
		const errors = [
			{
				foo: 'bar',
			},
			{
				foo: 'bar',
			},
		];
		const wrapper = shallow(<Component errors={errors} />);
		expect(wrapper.find('.col-md-6').props().style.marginTop).toBeUndefined();
	});
});
