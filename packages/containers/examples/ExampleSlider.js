import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { Map } from 'immutable';
import Slider from '../src/Slider';

const icons = [
	'talend-smiley-angry',
	'talend-smiley-unhappy',
	'talend-smiley-neutral',
	'talend-smiley-satisfied',
	'talend-smiley-enthusiast',
];

const delimiterStyle = {
	paddingTop: '25px',
	paddingBottom: '25px',
	borderBottom: '1px dashed grey',
};

const actions = [
	{
		id: 'icon1',
		label: 'Click Me',
		icon: 'talend-smiley-angry',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon2',
		label: 'Click Me',
		icon: 'talend-smiley-neutral',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon3',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon4',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
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
			<div style={delimiterStyle}>
				<p>default</p>
				<Slider id="slider1" />
			</div>
			<div style={delimiterStyle}>
				<p>with some icons</p>
				<Slider id="slider2" captionIcons={icons} initialState={nullState} />
			</div>
			<div style={delimiterStyle}>
				<p>with some actions icons</p>
				<Slider id="slider3" captionActions={actions} initialState={initialState} />
			</div>
			<div style={delimiterStyle}>
				<p>with icon close to label</p>
				<Slider
					id="slider4"
					initialState={initialState}
					captionsFormat={functionToFormat}
					captionTextStepNumber={5}
				/>
			</div>
		</div>
	),
};

export default ExampleSlider;
