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
	args: {
		onBarClick: action('onClick'),
		dataFeature: 'my.data.feature',
	},
} as Meta<LineChartProps>;

export const BasicLineChart = Template.bind({});
BasicLineChart.args = {
	chartOptions: {
		showGridLines: true,
		legend: {
			custom: true,
			rechartsOptions:{
				iconType: 'plainline',
				iconSize: 20,
				align: 'right',
				verticalAlign: 'top',
				wrapperStyle: {
					padding: '0 3.5rem 1rem 0'
				}
			},
		},
		tooltip: {
			custom: true,
		},
		xAxisOptions: {
			rechartsOptions: {
				dx: 0,
				interval: 2,
			}
		},
		leftYAxisOptions : {
			rechartsOptions : {
				type: 'number',
				domain: [0, 100],
				tickCount: 6,
				interval: 'preserveStartEnd',
				tickLine: false,
				unit: '%',
			},
		},
		rightYAxisOptions : {
			hideUnitInAxis: true,
			rechartsOptions: {
				hide: false,
				type: 'number',
				domain: [0, 5],
				tickCount: 6,
				tickLine: false,
				unit: '/5'
			},
		}
	},
	lines: [
		{
			key: 'trustScore',
			color: '#1667DF',
			tooltipLabel: 'Trust Score™',
			legendLabel: 'Talend Trust Score™',
			axis: 'right',
			rechartsOptions: {
				type: 'monotone',
				strokeWidth: 3,
				strokeDasharray: '13 4 13',
				dot: { r: 0 }
			}
		},
		{
			key: 'validity',
			color: '#B045E5',
			tooltipLabel: 'Validity',
			legendLabel: 'Validity',
			axis: 'left',
			rechartsOptions: {
				type: 'monotone',
				strokeWidth: 3,
				dot: { r: 0 },
			}
		},
	],
	data: [
		{
			xLabel: '2/2',
			trustScore: 2.2,
			validity: 50,
		},
		{
			xLabel: '2/4',
			trustScore: 2.2,
			validity: 50,
		},
		{
			xLabel: '2/6',
			trustScore: 2.6,
			validity: 50,
		},
		{
			xLabel: '2/8',
			trustScore: 3,
			validity: 50,
		},
		{
			xLabel: '2/10',
			trustScore: 2.9,
			validity: 50,
		},
		{
			xLabel: '2/12',
			trustScore: 3.1,
			validity: 50,
		},
		{
			xLabel: '2/14',
			trustScore: 3.4,
			validity: 65,
		},
		{
			xLabel: '2/16',
			trustScore: 3.4,
			validity: 65,
		},
		{
			xLabel: '2/18',
			trustScore: 3,
			validity: 65,
		},
		{
			xLabel: '2/20',
			trustScore: 3.1,
			validity: 65,
		},
		{
			xLabel: '2/22',
			trustScore: 3.9,
			validity: 55,
		},
		{
			xLabel: '2/24',
			trustScore: 3.5,
			validity: 55,
		},
		{
			xLabel: '2/26',
			trustScore: 3.5,
			validity: 55,
		},
		{
			xLabel: '2/28',
			trustScore: 3.9,
			validity: 55,
		},
		{
			xLabel: '2/30',
			trustScore: 4.2,
			validity: 75,
		},
	],
};

export const SimpleLineChart = Template.bind({});
SimpleLineChart.args = {
	chartOptions: {
		legend: {
			rechartsOptions:{
				align: 'right',
				verticalAlign: 'top',
			},
		},
		leftYAxisOptions : {
			rechartsOptions: {
				type: 'number',
				domain: [0, 5],
				tickCount: 6,
				tickLine: false,
			},
		},
	},
	lines: [
		{
			key: 'trustScore',
			color: '#1667DF',
			rechartsOptions: {
				type: 'monotone',
				strokeWidth: 3,
			}
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
