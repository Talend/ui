import React from 'react';
import { mount } from 'enzyme';
import HorizontalBarChart from './HorizontalBarChart.component';
import { PatternChart } from './HorizontalBarChart.stories';

describe('Horizontal bar chart', () => {
	it('Should trigger onBarClick', () => {
		const onBarClick = jest.fn();
		const component = mount(
			<HorizontalBarChart
				{...PatternChart.args}
				height={300}
				width={400}
				onBarClick={onBarClick}
				getTooltipContent={jest.fn().mockImplementation(() => 'tooltip')}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 1,
		} as any);
		component.update();
		component.find('BarChart').invoke('onClick')!({} as any);

		expect(onBarClick).toHaveBeenCalledWith(undefined, {
			filteredValue: 0,
			key: 'Entry not matching filter',
			value: 1500,
		});
	});

	it('Should render tooltip on hover', () => {
		const getTooltipContent = jest.fn().mockImplementation(() => 'myTooltipContent');
		const component = mount(
			<HorizontalBarChart
				{...PatternChart.args}
				height={300}
				width={400}
				onBarClick={jest.fn()}
				getTooltipContent={getTooltipContent}
			/>,
		);

		component.find('BarChart').invoke('onMouseMove')!({
			isTooltipActive: true,
			activeTooltipIndex: 1,
		} as any);
		component.update();

		expect(getTooltipContent).toHaveBeenCalledWith({
			filteredValue: 0,
			key: 'Entry not matching filter',
			value: 1500,
		});
		expect(component.find('Tooltip').text()).toEqual('myTooltipContent');
	});
});
