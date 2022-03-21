import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import VerticalBarChart, { VerticalBarChartProps } from './VerticalBarChart.component';
import  LineChart, { LineChartProps } from './LineChart.component';
import { YAxis } from 'recharts';
// import TooltipContent from '../../TooltipContent/TooltipContent.component';
// import { getVerticalBarChartTooltip } from '../barChart.tooltip';

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
			rechartsOptions:{
				iconType: "plainline",
				iconSize: 20,
				align: "right",
				verticalAlign: "top",
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
				type: "number",
				domain: [0, 100],
				tickCount: 6,
				interval: "preserveStartEnd",
				tickLine: false,
				unit: "%",
			},
		},
		rightYAxisOptions : {
			hideUnitInAxis: true,
			rechartsOptions: {
				hide: false,
				type: "number",
				domain: [0, 5],
				tickCount: 6,
				tickLine: false,
				unit: "/5"
			},
		}
	},
	lines: [
		{

			key: 'trustScore',
			color: '#1667DF',
			tooltipLabel: 'Trust Score™',
			axis: "right",
			rechartsOptions: {
				type: 'monotone',
				strokeWidth: 3,
				strokeDasharray: "13 4 13",
				dot: { r: 0 }
			}
		},
		{
			key: 'validity',
			color: '#B045E5',
			tooltipLabel: 'Validity',
			axis: "left",
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
	// getTooltipContent: entry => <TooltipContent entries={getVerticalBarChartTooltip(entry)} />,
};

// export const DateBarChart = Template.bind({});
// DateBarChart.args = {
// 	data: [
// 		{
// 			key: {
// 				min: 946681200000,
// 				max: 1262300400000,
// 			},
// 			label: '[2000, 2010[',
// 			value: 249,
// 			filteredValue: 40,
// 		},
// 		{
// 			key: {
// 				min: 1577833200000,
// 				max: 1262300400000,
// 			},
// 			label: '[2010, 2020[',
// 			value: 152,
// 			filteredValue: 75,
// 		},
// 		{
// 			key: { min: 1893452400000, max: 1577833200000 },
// 			label: '[2020, 2030[',
// 			value: 20,
// 			filteredValue: 20,
// 		},
// 	],
// 	showXAxis: true,
// 	getTooltipContent: entry => <TooltipContent entries={getVerticalBarChartTooltip(entry)} />,
// };

// export const MinBarSize = Template.bind({});
// MinBarSize.args = {
// 	data: [
// 		{
// 			key: {
// 				min: 10,
// 				max: 20,
// 			},
// 			label: '',
// 			value: 1,
// 		},
// 		{
// 			key: {
// 				min: 20,
// 				max: 30,
// 			},
// 			label: '',
// 			value: 9999,
// 		},
// 	],
// 	getTooltipContent: () => <div />,
// };
