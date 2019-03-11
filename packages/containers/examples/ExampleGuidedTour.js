import React from 'react';
import { Map, List } from 'immutable';
import GuidedTour from '../src/GuidedTour';

const initialState = Map({
	steps: List([
		{ content: 'Text A' },
		{ content: 'Text B' },
		{ content: 'Text C' },
	]),
});

export default function ExampleGuidedTour() {
	return (
		<GuidedTour initialState={initialState} />
	);
}
