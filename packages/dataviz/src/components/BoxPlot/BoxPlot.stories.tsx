import React from 'react';
import { Meta, Story } from '@storybook/react';
import BoxPlot, { BoxPlotProps } from './BoxPlot.component';

const Template: Story<BoxPlotProps> = args => <BoxPlot {...args} />;

export default {
	title: 'Dataviz/BoxPlot',
	component: BoxPlot,
} as Meta<BoxPlotProps>;

export const Default = Template.bind({});
Default.args = {
	width: 300,
	height: 300,
	boxPlotData: {
		max: 99712,
		mean: 47468.78,
		median: 44139,
		min: 1581,
		q1: 16501.75,
		q2: 79971.25,
	},
};
