import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import Slider from '../src/Slider';
import IconsProvider from '../src/IconsProvider';

const icons = [
	'talend-activity',
	'talend-most-trusted',
	'talend-network',
	'talend-streams',
	'talend-tdc-negative',
];

const style = {
	padding: '20px',
};

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
	{
		id: 'icon5',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
];

const functionToFormat = value => `${value}-test`;
const functionFormatFloor = value => `${Math.floor(value)}`;

storiesOf('Slider', module)
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<section>
			<IconsProvider />
			<div style={style}>
				<div style={delimiterStyle} >
					<p>By default</p>
					<Slider />
				</div>
				<div style={delimiterStyle}>
					<p>With disabled</p>
					<Slider disabled />
				</div>
				<div style={delimiterStyle}>
					<p>With value & format</p>
					<Slider id="selectable" captionsFormat={functionToFormat} value={10} />
				</div>
				<div style={delimiterStyle}>
					<p>With icons</p>
					<Slider captionIcons={icons} />
				</div>
				<div style={delimiterStyle}>
					<p>with icon buttons</p>
					<Slider captionActions={actions} value={50} />
				</div>
				<div style={delimiterStyle}>
					<p>with step number</p>
					<Slider value={25} captionTextStepNumber={5} captionsFormat={functionFormatFloor} />
				</div>
			</div>
		</section>
	));
