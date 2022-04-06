/* eslint-disable no-console */
import React from 'react';
import { mount } from 'enzyme';
import LineChart from './LineChart.component';
import { LineChartOptions, LineOptions } from './LineChart.types';

const chartOptions: LineChartOptions = {
	width: 300,
	height: 150,

	leftYAxisOptions : {
		type: 'number',
		domain: [0, 5],
	},
};

const dualAxisChartOptions: LineChartOptions = {
	...chartOptions,
	rightYAxisOptions: {
		hide: false,
		type: 'number',
		unit: '%',
		domain: [0, 100],
	}
};

const trustScoreLine: LineOptions = {
	key: 'trustScore',
	color: '#1667DF',
};

const validityLine: LineOptions = {
		key: 'validity',
		color: '#B045E5',
		tooltipLabel: 'Validity',
		legendLabel: 'Validity',
		axis: 'right',
};

const lines: LineOptions[]
 = [
	{
		key: 'trustScore',
		color: '#1667DF',
	},
];
const entries = [
	{
		xLabel: '2/2',
		trustScore: 2.2,
		validity: 30,
	},

	{
		xLabel: '2/16',
		trustScore: 3.4,
		validity: 40,
	},

	{
		xLabel: '2/24',
		trustScore: 3.5,
		validity: 40,
	},

	{
		xLabel: '2/30',
		trustScore: 4.2,
		validity: 50,
	},
];

describe('line chart', () => {
	it('Should render one line', () => {

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
			/>
		);

		expect(wrapper.find('Layer.recharts-line').length).toBe(1);
	});

	it('Should render one axis', () => {

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
			/>
		);

		expect(wrapper.find('Layer.recharts-yAxis').length).toBe(1);
	});

	it('Should trigger line click', () => {
		const onLineClicked = jest.fn();

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLineClicked={onLineClicked}
			/>
		);

		wrapper.find(`Line#line_${lines[0].key}`).invoke('onClick')!({} as any);

		expect(onLineClicked).toHaveBeenCalledWith(lines[0].key);
	});

	it('Should trigger legend click', () => {
		const onLegendItemClicked = jest.fn();

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLegendItemClicked={onLegendItemClicked}
			/>
		);

		wrapper.find(`li#legend_item_${lines[0].key}`).childAt(0).invoke('onClick')!({} as any);
		expect(onLegendItemClicked).toHaveBeenCalledWith(lines[0].key);
	});

	it('Should trigger line hover', () => {
		const onLineHovered = jest.fn();

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLineHovered={onLineHovered}
			/>
		);

		wrapper.find(`Line#line_${lines[0].key}`).invoke('onMouseEnter')!({} as any);
		wrapper.find(`Line#line_${lines[0].key}`).invoke('onMouseLeave')!({} as any);
		expect(onLineHovered).toHaveBeenNthCalledWith(1, lines[0].key);
		expect(onLineHovered).toHaveBeenNthCalledWith(2, '');
	});

	it('Should trigger legend hover', () => {
		const onLegendItemHovered = jest.fn();

		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLegendItemHovered={onLegendItemHovered}
			/>
		);

		wrapper.find(`li#legend_item_${lines[0].key}`).childAt(0).invoke('onMouseEnter')!({} as any);
		wrapper.find(`li#legend_item_${lines[0].key}`).childAt(0).invoke('onMouseLeave')!({} as any);
		expect(onLegendItemHovered).toHaveBeenNthCalledWith(1, lines[0].key);
		expect(onLegendItemHovered).toHaveBeenNthCalledWith(2, '');
	});

	it('Should render two line', () => {
		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine, validityLine]}
				chartOptions={dualAxisChartOptions}
			/>
		);

		expect(wrapper.find('Layer.recharts-line').length).toBe(2);
	});

	it('Should render two axis', () => {
		const wrapper = mount(
			<LineChart
				data={entries}
				lines={[trustScoreLine, validityLine]}
				chartOptions={dualAxisChartOptions}
			/>
		);

		expect(wrapper.find('Layer.recharts-yAxis').length).toBe(2);
	});
});
