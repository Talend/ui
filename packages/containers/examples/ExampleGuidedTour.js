import React from 'react';
import { fromJS } from 'immutable';
import { GuidedTour, Action } from '../src';

const initialState = fromJS({
	show: true,
});

const steps = [
	{
		content: {
			body: 'Eenie',
		},
	},
	{
		content: {
			body: 'Meenie',
		},
	},
	{
		content: {
			body: 'Miney',
		},
	},
	{
		content: {
			body: 'Moe',
		},
	},
];

const ExampleGuidedTour = {
	default: () => (
		<div>
			<Action actionId="show:guidedTour" />
			<GuidedTour initialState={initialState} steps={steps} />
		</div>
	),
};

export default ExampleGuidedTour;
