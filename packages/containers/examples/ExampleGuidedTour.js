import React from 'react';
import { Map } from 'immutable';
import GuidedTour from '../src/GuidedTour';

const initialState = Map({
	steps: [
		{ content: 'Text A' },
		{ content: 'Text B' },
		{ content: 'Text C' },
	],
});

export default function ExampleGuidedTour() {
	return (
		<GuidedTour initialState={initialState} />
	);
}
