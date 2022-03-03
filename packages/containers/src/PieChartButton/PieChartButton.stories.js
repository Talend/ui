import React from 'react';
import PieChartButton from '.';

const payload = { type: 'CLICK' };

const initialState1 = {
	model: [{ percentage: 10, color: 'rio-grande' }],
};
const initialState2 = {
	model: [
		{ percentage: 10, color: 'rio-grande' },
		{ percentage: 15, color: 'chestnut-rose' },
		{ percentage: 5, color: 'lightning-yellow' },
		{ percentage: 20, color: 'dove-gray' },
	],
};
const initialStateInProgress = {
	loading: true,
};

export default {
	title: 'PieChartButton',
};

export const Default = () => (
	<div>
		<p>Loading :</p>
		<PieChartButton id="pieChart1" initialState={initialStateInProgress} payload={payload} />
		<p>With Data :</p>
		<PieChartButton id="pieChart2" initialState={initialState1} payload={payload} />
		<p>With Other data :</p>
		<PieChartButton id="pieChart3" initialState={initialState2} display="large" payload={payload} />
	</div>
);
