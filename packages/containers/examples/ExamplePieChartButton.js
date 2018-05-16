import React from 'react';
import { Map } from 'immutable';
import PieChartButton from '../src/PieChartButton';

const initialState1 = new Map({
	model: [{ percentage: 10, color: 'rio-grande' }],
});
const initialState2 = new Map({
	model: [
		{ percentage: 10, color: 'rio-grande' },
		{ percentage: 15, color: 'chestnut-rose' },
		{ percentage: 5, color: 'lightning-yellow' },
		{ percentage: 20, color: 'slate-gray' },
	],
});
const initialStateInProgress = new Map({
	inProgress: true,
});

const ExamplePieChartButton = {
	Slider: () => (
		<div>
			<p>Loading :</p>
			<PieChartButton id="pieChart1" initialState={initialStateInProgress} />
			<p>With Data :</p>
			<PieChartButton id="pieChart2" initialState={initialState1} />
			<p>With Other data :</p>
			<PieChartButton id="pieChart3" initialState={initialState2} display="large" />
		</div>
	),
};

export default ExamplePieChartButton;
