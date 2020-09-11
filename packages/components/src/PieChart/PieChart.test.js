import React from 'react';
import { shallow } from 'enzyme';
import PieChartIcon from './PieChartIcon.component';
import PieChartButton from './PieChartButton.component';
import PieChart from './PieChart.component';

describe('PieChart', () => {
	it('should render a PieChartButton', () => {
		const wrapper = shallow(<PieChart onClick={jest.fn()} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a PieChartIcon', () => {
		const wrapper = shallow(<PieChart label="myToolTip" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a PieChart with a tooltip', () => {
		const wrapper = shallow(<PieChart label="myToolTip" tooltip />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
