import React from 'react';
import { fromJS } from 'immutable';
import GuidedTour from '../src/GuidedTour';

const initialState = fromJS({
	steps: [{ content: 'Text A' }, { content: 'Text B' }, { content: 'Text C' }],
});

const ExampleGuidedTour = {
	default: () => <GuidedTour initialState={initialState} />,
};

export default ExampleGuidedTour;
