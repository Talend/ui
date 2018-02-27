import React from 'react';
import { Map } from 'immutable';
import PieChartButton from '../src/PieChartButton';

const initialState1 = new Map({
	model: [{ percentage: 10, color: 'red' }],
});
const initialState2 = new Map({
	model: [
		{ percentage: 10, color: 'red' },
		{ percentage: 15, color: 'blue' },
		{ percentage: 5, color: 'cyan' },
		{ percentage: 20, color: 'yellow' },
		{ percentage: 15, color: 'black' },
	],
});
const initialStateInProgress = new Map({
	inProgress: true,
});

const ExamplePieChartButton = {
	Slider: () => (
		<div>
			<p>Without model :</p>
			<PieChartButton id="pieChart0" />
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
