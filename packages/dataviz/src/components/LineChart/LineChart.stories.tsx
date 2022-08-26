import React from 'react';
import { Meta } from '@storybook/react';
import LineChart, { LineChartProps } from './LineChart.component';

export default {
	title: 'Dataviz/LineChart',
	component: LineChart,
	decorators: [
		ChartStory => (
			<div style={{ height: 300, width: 600 }}>
				<ChartStory />
			</div>
		),
	],
	parameters: {
		docs: {
			description: {
				component:
					'A curve type chart based on the [LineChart component](https://recharts.org/en-US/api/LineChart) of [Recharts ](https://recharts.org/en-US)',
			},
		},
	},
} as Meta<LineChartProps>;

export const FullyCustomisedLineChart = {
	args: {
		chartOptions: {
			showGridLines: true,
			tooltip: {
				showInnactives: true,
			},
			legend: {
				verticalAlign: 'top',
				horizontalAlign: 'right',
				showInactives: true,
			},
			xAxisOptions: {
				interval: 2,
				horizontalOffset: 10,
				verticalOffset: 10,
				clipDomain: true,
				formatter: (date: Date) => `${date.getMonth()}/${date.getDate()}`,
				tooltipFormatter: (date: Date) => date.toLocaleString(),
			},
			leftYAxisOptions: {
				unit: '%',
				type: 'number',
				domain: [0, 100],
				horizontalOffset: 0,
				verticalOffset: 10,
			},
			rightYAxisOptions: {
				hide: false,
				type: 'number',
				domain: [0, 5],
				horizontalOffset: 0,
				verticalOffset: -10,
				unit: '/5',
				hideUnitInAxis: true,
			},
		},
		lines: [
			{
				key: 'trustScore',
				color: '#1667DF',
				tooltipLabel: 'Trust Score™',
				legendLabel: 'Talend Trust Score™',
				axis: 'right',
				status: 'light',
			},
			{
				key: 'validity',
				color: '#D2AD15',
				tooltipLabel: 'Validity',
				legendLabel: 'Validity',
				axis: 'left',
				status: 'highlighted',
			},
			{
				key: 'threshold',
				color: '#D2AD15',
				tooltipLabel: 'Axis threshold',
				legendLabel: 'Axis threshold',
				axis: 'left',
				status: 'light',
				dashed: true,
			},
		],
		data: [
			{
				xLabel: new Date(2021, 2, 2),
				trustScore: 2.2,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 2),
				trustScore: 2.2,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 4),
				trustScore: 2.2,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 6),
				trustScore: 2.6,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 8),
				trustScore: 3,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 10),
				trustScore: 2.9,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 12),
				trustScore: 3.1,
				validity: 50,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 14),
				trustScore: 3.4,
				validity: 65,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 16),
				trustScore: 3.4,
				validity: 65,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 18),
				trustScore: 3,
				validity: 65,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 20),
				trustScore: 3.1,
				validity: 65,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 22),
				trustScore: 3.9,
				validity: 55,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 24),
				trustScore: 3.5,
				validity: 55,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 26),
				trustScore: 3.5,
				validity: 55,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 28),
				trustScore: 3.9,
				validity: 55,
				threshold: 30,
			},
			{
				xLabel: new Date(2022, 2, 30),
				trustScore: 4.2,
				validity: 75,
				threshold: 30,
			},
		],
	},
};

export const SimpleLineChart = {
	args: {
		chartOptions: {
			leftYAxisOptions: {
				type: 'number',
				domain: [0, 5],
			},
		},
		lines: [
			{
				key: 'trustScore',
				color: '#1667DF',
			},
		],
		data: [
			{
				xLabel: '2/2',
				trustScore: 2.2,
			},

			{
				xLabel: '2/16',
				trustScore: 3.4,
			},

			{
				xLabel: '2/24',
				trustScore: 3.5,
			},

			{
				xLabel: '2/30',
				trustScore: 4.2,
			},
		],
	},
};

export const MultiCurveLineChart = {
	args: {
		chartOptions: {
			leftYAxisOptions: {
				type: 'number',
				domain: [0, 5],
			},
		},
		lines: [
			{
				key: 'trustScore',
				color: '#1667DF',
			},
			{
				key: 'globalScore',
				color: '#4DD832',
			},
		],
		data: [
			{
				xLabel: '2/2',
				trustScore: 2.2,
				globalScore: 3,
			},

			{
				xLabel: '2/16',
				trustScore: 3.4,
				globalScore: 3.2,
			},

			{
				xLabel: '2/24',
				trustScore: 3.5,
				globalScore: 3.2,
			},

			{
				xLabel: '2/30',
				trustScore: 4.2,
				globalScore: 4,
			},
		],
	},
};

export const CustomXAxisDomainLineChart = {
	args: {
		chartOptions: {
			leftYAxisOptions: {
				type: 'number',
				domain: [0, 5],
			},
			xAxisOptions: {
				type: 'number',
				domain: [new Date('2022-06-10').getTime(), new Date('2022-06-18').getTime()],
				formatter: (value: any) => new Date(value).toLocaleDateString(),
			},
		},
		lines: [
			{
				key: 'trustScore',
				color: '#1667DF',
			},
		],
		data: [
			{
				xLabel: new Date('2022-06-12').getTime(),
				trustScore: 2.2,
			},

			{
				xLabel: new Date('2022-06-13').getTime(),
				trustScore: 3.4,
			},

			{
				xLabel: new Date('2022-06-14').getTime(),
				trustScore: 3.5,
			},

			{
				xLabel: new Date('2022-06-15').getTime(),
				trustScore: 4.2,
			},
		],
	},
};
