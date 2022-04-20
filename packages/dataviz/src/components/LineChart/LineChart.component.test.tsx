import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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

		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
			/>
		);
		// eslint-disable-next-line testing-library/no-container
		const lineItems = container.querySelectorAll('g.recharts-layer.recharts-line');

		expect(lineItems.length).toBe(1);

	});

	it('Should render one axis', () => {

		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
			/>
		);
		// eslint-disable-next-line testing-library/no-container
		const foundYAxis = container.querySelectorAll('g.recharts-yAxis.yAxis');

		expect(foundYAxis.length).toBe(1);
	});

	it('Should trigger line click', () => {
		const onLineClicked = jest.fn();

		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLineClicked={onLineClicked}
			/>
		);
		// eslint-disable-next-line testing-library/no-container
		const lineItem = container.querySelector('#line_trustScore');
		if (lineItem) {
			fireEvent.click(lineItem);
		}

		expect(onLineClicked).toHaveBeenCalledWith(lines[0].key);
	});

	it('Should trigger legend click', () => {
		const handleLegendItemClicked = jest.fn();

		render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLegendItemClicked={handleLegendItemClicked}
			/>
		);
		fireEvent.click(screen.getByTestId(`legend_item_${trustScoreLine.key}`));

		expect(handleLegendItemClicked).toHaveBeenCalledWith(trustScoreLine.key);
	});

	it('Should trigger line hover', () => {
		const onLineHovered = jest.fn();

		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLineHovered={onLineHovered}
			/>
		);
		// eslint-disable-next-line testing-library/no-container
		const lineItem = container.querySelector('#line_trustScore');
		if(lineItem) {
			fireEvent.mouseEnter(lineItem);
			fireEvent.mouseLeave(lineItem);
		}

		expect(onLineHovered).toHaveBeenNthCalledWith(1, lines[0].key);
		expect(onLineHovered).toHaveBeenNthCalledWith(2, '');
	});

	it('Should trigger legend hover', () => {
		const handleLegendItemHovered = jest.fn();

		render(
			<LineChart
				data={entries}
				lines={[trustScoreLine]}
				chartOptions={chartOptions}
				onLegendItemHovered={handleLegendItemHovered}
			/>
		);
		const legendItem = screen.getByTestId(`legend_item_${trustScoreLine.key}`);
		fireEvent.mouseEnter(legendItem);
		fireEvent.mouseLeave(legendItem);

		expect(handleLegendItemHovered).toHaveBeenNthCalledWith(1, lines[0].key);
		expect(handleLegendItemHovered).toHaveBeenNthCalledWith(2, '');
	});

	it('Should render two line', () => {
		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine, validityLine]}
				chartOptions={dualAxisChartOptions}
			/>
		);
		// eslint-disable-next-line testing-library/no-container
		const lineItems = container.querySelectorAll('g.recharts-layer.recharts-line');

		expect(lineItems.length).toBe(2);
	});

	it('Should render two axis', () => {
		const { container } = render(
			<LineChart
				data={entries}
				lines={[trustScoreLine, validityLine]}
				chartOptions={dualAxisChartOptions}
			/>
		);

		// eslint-disable-next-line testing-library/no-container
		const foundYAxis = container.querySelectorAll('g.recharts-yAxis.yAxis');

		expect(foundYAxis.length).toBe(2);
	});
});
