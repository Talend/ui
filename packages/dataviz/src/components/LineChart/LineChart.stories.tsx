import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  LineChart, { LineChartProps } from './LineChart.component';

const Template: Story<LineChartProps> = args => <LineChart {...args} />;

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
				component: 'A curve type chart based on the [LineChart component](https://recharts.org/en-US/api/LineChart) of [Recharts ](https://recharts.org/en-US)',
			  },
		},
	},
} as Meta<LineChartProps>;


export const FullyCustomisedLineChart = Template.bind({});
FullyCustomisedLineChart.args = {
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
			horizontalOffset: 0,
			formatter: date => `${date.getMonth()}/${date.getDate()}`,
			tooltipFormatter: date => date.toLocaleString(),
		},
		leftYAxisOptions : {
			unit: '%',
			type: 'number',
			domain: [0, 100],
		},
		rightYAxisOptions : {
			hide: false,
			type: 'number',
			domain: [0, 5],
			unit: '/5',
			hideUnitInAxis: true,
		}
	},
	lines: [
		{
			key: 'trustScore',
			color: '#1667DF',
			dashed: true,
			tooltipLabel: 'Trust Score™',
			legendLabel: 'Talend Trust Score™',
			axis: 'right',
			status: 'inactive',
		},
		{
			key: 'validity',
			color: '#B045E5',
			tooltipLabel: 'Validity',
			legendLabel: 'Validity',
			axis: 'left',
			status: 'highlighted',
		},
	],
	data: [
		{
			xLabel: new Date(2022, 2, 2),
			trustScore: 2.2,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 4),
			trustScore: 2.2,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 6),
			trustScore: 2.6,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 8),
			trustScore: 3,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 10),
			trustScore: 2.9,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 12),
			trustScore: 3.1,
			validity: 50,
		},
		{
			xLabel: new Date(2022, 2, 14),
			trustScore: 3.4,
			validity: 65,
		},
		{
			xLabel: new Date(2022, 2, 16),
			trustScore: 3.4,
			validity: 65,
		},
		{
			xLabel: new Date(2022, 2, 18),
			trustScore: 3,
			validity: 65,
		},
		{
			xLabel: new Date(2022, 2, 20),
			trustScore: 3.1,
			validity: 65,
		},
		{
			xLabel: new Date(2022, 2, 22),
			trustScore: 3.9,
			validity: 55,
		},
		{
			xLabel: new Date(2022, 2, 24),
			trustScore: 3.5,
			validity: 55,
		},
		{
			xLabel: new Date(2022, 2, 26),
			trustScore: 3.5,
			validity: 55,
		},
		{
			xLabel: new Date(2022, 2, 28),
			trustScore: 3.9,
			validity: 55,
		},
		{
			xLabel: new Date(2022, 2, 30),
			trustScore: 4.2,
			validity: 75,
		},
	],
};

export const SimpleLineChart = Template.bind({});
SimpleLineChart.args = {
	chartOptions: {
		leftYAxisOptions : {
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
};

export const MultiCurveLineChart = Template.bind({});
MultiCurveLineChart.args = {
	chartOptions: {
		leftYAxisOptions : {
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
};

export const CustomLegendLineChart = Template.bind({});
CustomLegendLineChart.args = {
	chartOptions: {
		legend: {
			verticalAlign: 'top',
			horizontalAlign: 'right'
		},
		leftYAxisOptions : {
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
};

export const CustomTooltipLineChart = Template.bind({});
CustomTooltipLineChart.args = {
	chartOptions: {
		leftYAxisOptions : {
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
};

