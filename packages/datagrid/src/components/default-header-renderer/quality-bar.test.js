import React from 'react';
import { shallow } from 'enzyme';

import QualityBar from './quality-bar.component';

describe('#QualityBar', () => {
	it('should render QualityBar', () => {
		const wrapper = shallow(<QualityBar invalid={33} empty={33} valid={34} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without invalid value', () => {
		const wrapper = shallow(<QualityBar invalid={0} empty={33} valid={34} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without empty value', () => {
		const wrapper = shallow(<QualityBar invalid={33} empty={0} valid={34} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render QualityBar without valid value', () => {
		const wrapper = shallow(<QualityBar invalid={33} empty={33} valid={0} />);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
