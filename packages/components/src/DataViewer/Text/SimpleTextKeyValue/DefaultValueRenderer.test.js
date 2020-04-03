import React from 'react';
import { shallow } from 'enzyme';

import DefaultValueRenderer from './DefaultValueRenderer.component';

describe('#DefaultValueRenderer', () => {
	it('should render without the tooltip', () => {
		const wrapper = shallow(<DefaultValueRenderer value="loreum" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a boolean', () => {
		const wrapper = shallow(<DefaultValueRenderer value={false} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a bytes', () => {
		const wrapper = shallow(<DefaultValueRenderer value={{ bytes: 'ejfiejifje' }} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render empty when the value is null', () => {
		const wrapper = shallow(<DefaultValueRenderer value={null} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render empty when the value is undefined', () => {
		const wrapper = shallow(<DefaultValueRenderer value={undefined} />);

		expect(wrapper.find('div').text()).toBe('');
	});

	it('should render the leading/trailing special character', () => {
		const wrapper = shallow(<DefaultValueRenderer value=" loreum " />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultValueRenderer (custom renderer) with the tooltip when the label overflow in width', () => {
		const wrapper = shallow(<DefaultValueRenderer value=" loreum " />);
		wrapper.instance().setDOMElement({
			scrollWidth: 20,
			clientWidth: 15,
			scrollHeight: 10,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();

		expect(wrapper.getElement()).toMatchSnapshot();

		wrapper.instance().setDOMElement({
			scrollWidth: 10,
			clientWidth: 15,
			scrollHeight: 10,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();
		// should remove the tooltip
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultValueRenderer with the tooltip when the label overflow in width', () => {
		const wrapper = shallow(<DefaultValueRenderer value="loreum" />);
		wrapper.instance().setDOMElement({
			scrollWidth: 20,
			clientWidth: 15,
			scrollHeight: 10,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();

		expect(wrapper.getElement()).toMatchSnapshot();

		wrapper.instance().setDOMElement({
			scrollWidth: 10,
			clientWidth: 15,
			scrollHeight: 10,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();
		// should remove the tooltip
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultValueRenderer with the tooltip when the label overflow in height', () => {
		const wrapper = shallow(<DefaultValueRenderer value="loreum" />);
		wrapper.instance().setDOMElement({
			scrollWidth: 10,
			clientWidth: 15,
			scrollHeight: 15,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();

		expect(wrapper.getElement()).toMatchSnapshot();

		wrapper.instance().setDOMElement({
			scrollWidth: 10,
			clientWidth: 15,
			scrollHeight: 14,
			clientHeight: 10,
		});

		wrapper
			.find('div')
			.at(0)
			.simulate('focus');

		wrapper.update();
		// should remove the tooltip
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
