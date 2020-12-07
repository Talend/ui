import React from 'react';
import { mount } from 'enzyme';
import VerticalBarChart from './VerticalBarChart.component';
import { DateBarChart, NumberBarChart } from './VerticalBarChart.stories';

describe('Vertical bar chart', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = jest.fn();
		const component = mount(
			<VerticalBarChart
				{...NumberBarChart.args}
				height={300}
				width={300}
				onBarClick={onBarClick}
				getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')({
			isTooltipActive: true,
			activeTooltipIndex: 1,
		} as any);
		component.update();
		component.find('BarChart').invoke('onClick')({} as any);

		expect(onBarClick).toHaveBeenCalledWith(undefined, NumberBarChart.args?.data?.[1]);
	});

	it('Should render tooltip on hover', () => {
		const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
		const component = mount(
			<VerticalBarChart
				{...NumberBarChart.args}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={getTooltipContent}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')({
			isTooltipActive: true,
			activeTooltipIndex: 1,
		} as any);
		component.update();

		expect(getTooltipContent).toHaveBeenCalledWith(NumberBarChart.args?.data?.[1]);
		expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});

	it('Should display x axis label for date chart', () => {
		const component = mount(
			<VerticalBarChart
				{...DateBarChart.args}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(
			component.find('.xAxis .recharts-cartesian-axis-tick tspan').get(0).props.children,
		).toEqual('[2000, 2010[');
	});

	it('Should not display x axis label for number chart', () => {
		const component = mount(
			<VerticalBarChart
				{...NumberBarChart.args}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(component.find('.xAxis .recharts-cartesian-axis-tick tspan')).toHaveLength(0);
	});
});
