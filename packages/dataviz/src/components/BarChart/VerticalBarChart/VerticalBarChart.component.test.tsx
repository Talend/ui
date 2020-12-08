import React from 'react';
import { mount } from 'enzyme';
import VerticalBarChart from './VerticalBarChart.component';
import { DataType } from '../barChart.types';

describe('Vertical bar chart', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = jest.fn();
		const entry = {
			key: { min: 2000, max: 2100 },
			label: '[2000, 2100[',
			value: 200,
			filteredValue: 100,
		};
		const component = mount(
			<VerticalBarChart
				data={[entry]}
				dataType={DataType.NUMBER}
				height={300}
				width={300}
				onBarClick={onBarClick}
				getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 0,
		} as any);
		component.update();
		component.find('BarChart').invoke('onClick')!({} as any);

		expect(onBarClick).toHaveBeenCalledWith(undefined, entry);
	});

	it('Should render tooltip on hover', () => {
		const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
		const entry = {
			key: { min: 2000, max: 2100 },
			label: '[2000, 2100[',
			value: 200,
			filteredValue: 100,
		};
		const component = mount(
			<VerticalBarChart
				data={[entry]}
				dataType={DataType.NUMBER}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={getTooltipContent}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 0,
		} as any);
		component.update();

		expect(getTooltipContent).toHaveBeenCalledWith(entry);
		expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});

	it('Should display x axis label for date chart', () => {
		const component = mount(
			<VerticalBarChart
				data={[
					{
						key: {
							min: 946681200000,
							max: 1262300400000,
						},
						label: '[2000, 2010[',
						value: 249,
					},
				]}
				dataType={DataType.DATE}
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
				data={[
					{
						key: { min: 2000, max: 2100 },
						label: '[2000, 2100[',
						value: 200,
						filteredValue: 100,
					},
				]}
				dataType={DataType.NUMBER}
				height={300}
				width={300}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(component.find('.xAxis .recharts-cartesian-axis-tick tspan')).toHaveLength(0);
	});
});
