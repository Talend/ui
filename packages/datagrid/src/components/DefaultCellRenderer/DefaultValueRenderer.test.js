import React from 'react';
import { shallow } from 'enzyme';

import DefaultValueRenderer from './DefaultValueRenderer.component';

describe('#DefaultValueRenderer', () => {
	it('should render DefaultValueRenderer label without the tooltip', () => {
		const wrapper = shallow(<DefaultValueRenderer label="loreum" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultValueRenderer cententRenderer without the tooltip', () => {
		const wrapper = shallow(
			<DefaultValueRenderer contentRenderer={() => <div>i'm a custom renderer</div>} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render DefaultValueRenderer label with the tooltip when the label overflow in width', () => {
		const wrapper = shallow(<DefaultValueRenderer label="loreum" />);
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

	it('should render DefaultValueRenderer label with the tooltip when the label overflow in height', () => {
		const wrapper = shallow(<DefaultValueRenderer label="loreum" />);
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
});
