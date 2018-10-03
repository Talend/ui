import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { Map } from 'immutable';
import Slider from '../src/Slider';
import { action } from '@storybook/addon-actions';

const icons = [
	'talend-smiley-angry',
	'talend-smiley-unhappy',
	'talend-smiley-neutral',
	'talend-smiley-satisfied',
	'talend-smiley-enthusiast',
];

const actions = [
	{
		id: 'icon1',
		label: 'Click Me',
		icon: 'talend-dataprep',
		'data-feature': 'action',
		onClick: action('action1'),
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon2',
		label: 'Click Me',
		icon: 'talend-dataprep',
		'data-feature': 'action',
		onClick: action('action2'),
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon3',
		label: 'Click Me',
		icon: 'talend-dataprep',
		'data-feature': 'action',
		onClick: action('action3'),
		link: true,
		hideLabel: true,
	},
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
			<p>with some actions icons</p>
			<Slider id="slider3" captionActions={actions} initialState={initialState} />
			<p>with icon close to label</p>
			<Slider
				id="slider4"
				initialState={initialState}
				captionsFormat={functionToFormat}
				captionTextStepNumber={5}
			/>
		</div>
	),
};

export default ExampleSlider;
