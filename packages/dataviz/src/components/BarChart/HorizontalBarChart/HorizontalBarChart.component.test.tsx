import React from 'react';
import { mount } from 'enzyme';
import HorizontalBarChart from './HorizontalBarChart.component';
import { ChartStyle } from '../../../types';

describe('Horizontal bar chart', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = jest.fn();
		const component = mount(
			<HorizontalBarChart
				data={[
					{
						key: 'Entry fully matching filter',
						value: 2145,
						filteredValue: 2145,
					},
				]}
				chartStyle={ChartStyle.VALUE}
				height={300}
				width={400}
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

		expect(onBarClick).toHaveBeenCalledWith(undefined, {
			filteredValue: 2145,
			key: 'Entry fully matching filter',
			value: 2145,
		});
	});

	it('Should render tooltip on hover', () => {
		const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
		const component = mount(
			<HorizontalBarChart
				data={[
					{
						key: 'Entry fully matching filter',
						value: 2145,
						filteredValue: 2145,
					},
				]}
				chartStyle={ChartStyle.VALUE}
				height={300}
				width={400}
				onBarClick={jest.fn()}
				getTooltipContent={getTooltipContent}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 0,
		} as any);
		component.update();

		expect(getTooltipContent).toHaveBeenCalledWith({
			filteredValue: 2145,
			key: 'Entry fully matching filter',
			value: 2145,
		});
		expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});
	it('Should not grow to available size if not enough data provided', () => {
		const component = mount(
			<HorizontalBarChart
				data={[
					{
						key: 'Entry fully matching filter',
						value: 2145,
						filteredValue: 2145,
					},
				]}
				chartStyle={ChartStyle.VALUE}
				onBarClick={jest.fn()}
				getTooltipContent={jest.fn()}
			/>,
		);

		expect(component.find('ResponsiveContainer').prop('height')).toEqual(65);
	});
});
