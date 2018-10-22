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
];

const functionToFormat = value => `${value}-test`;
const functionFormatFloor = value => Math.floor(value);

storiesOf('Slider', module)
	.addDecorator(checkA11y)
	.addWithInfo('default', () => (
		<section>
			<IconsProvider />
			<div style={style}>
				<div style={delimiterStyle}>
					<p>By default :</p>
					<Slider />
				</div>
				<div style={delimiterStyle}>
					<p>With value & format</p>
					<Slider id="selectable" captionsFormat={functionToFormat} value={10} />
				</div>
				<div style={delimiterStyle}>
					<p>With disabled label</p>
				</div>
				<Slider disabled />
				<div style={delimiterStyle}>
					<p> with default value :</p>
				</div>
				<Slider value={45} />
				<div style={delimiterStyle}>
					<p> With a label:</p>
					<Slider value={null} captionIcons={icons} />
				</div>
				<div style={delimiterStyle}>
					<p> With a label:</p>
					<Slider value={50} captionIcons={icons} />
				</div>
				<div style={delimiterStyle}>
					<p>with icon buttons</p>
					<Slider captionActions={actions} value={100} />
				</div>
				<div style={delimiterStyle}>
					<p>with some icons</p>
					<Slider value={40} captionTextStepNumber={4} captionsFormat={functionFormatFloor} />
				</div>
				<div style={delimiterStyle}>
					<p>with icon close to label</p>
					<Slider value={96} />
				</div>
			</div>
		</section>
	));
