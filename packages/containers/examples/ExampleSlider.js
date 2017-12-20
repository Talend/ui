import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { Map } from 'immutable';
import { Slider } from '../src';

const icons = [
	'talend-smiley-rating',
	'talend-most-trusted',
	'talend-network',
	'talend-streams',
	'talend-tdc-negative',
];

const functionToFormat = value => `${value}%`;

const nullState = new Map();
const initialState = new Map({
	value: 15,
});

const ExampleSlider = {
	Slider: () => (
		<div>
			<IconsProvider />
			<Slider id="slider1" />
			<p>with some icons</p>
			<Slider id="slider2" captionIcons={icons} initialState={nullState} />
			<p>with icon close to label</p>
			<Slider
				id="slider3"
				initialState={initialState}
				captionsFormat={functionToFormat}
				captionTextStepNumber={5}
			/>
		</div>
	),
};

export default ExampleSlider;
