import React from 'react';
import { fromJS } from 'immutable';
import { GuidedTour, Action } from '../src';

const initialState = fromJS({
	show: true,
	steps: [{ content: 'Text A' }, { content: 'Text B' }, { content: 'Text C' }],
});

const ExampleGuidedTour = {
	default: () => (
		<div>
			<Action actionId="show:guidedTour" />
			<GuidedTour initialState={initialState} />
		</div>
	),
};

export default ExampleGuidedTour;
