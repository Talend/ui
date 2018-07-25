import React from 'react';
import { shallow } from 'enzyme';
import PieChartIcon from './PieChartIcon.component';
import PieChartButton from './PieChartButton.component';
import PieChart, { decorateWithTooltip, getPieChartComponent } from './PieChart.component';

describe('getPieChartComponent', () => {
	it('return a piechart component, icon', () => {
		expect(getPieChartComponent(null)).toEqual(PieChartIcon);
	});
	it('return a piechart component, button', () => {
		expect(getPieChartComponent(jest.fn())).toEqual(PieChartButton);
	});
});

describe('decorateWithTooltip', () => {
	it('should return component with no tooltip', () => {
		const cmp = decorateWithTooltip(false, 'label', 'top', PieChartButton);
		expect(cmp).toMatchSnapshot();
	});

	it('should return component with tooltip', () => {
		const cmp = decorateWithTooltip(true, 'label', 'top', PieChartButton);
		expect(cmp).toMatchSnapshot();
	});
});

describe('PieChart', () => {
	it('should render a PieChartButton', () => {
		const wrapper = shallow(<PieChart onClick={jest.fn()} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a PieChartIcon with a tooltip', () => {
		const wrapper = shallow(<PieChart label="myToolTip" tooltip />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
