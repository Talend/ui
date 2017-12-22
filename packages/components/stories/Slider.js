import React from 'react';
import { storiesOf } from '@storybook/react';

import { Slider, IconsProvider } from '../src/';

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

const functionToFormat = value => `${value}-test`;
const functionFormatFloor = value => Math.floor(value);

storiesOf('Slider', module).addWithInfo('default', () => (
	<section>
		<IconsProvider />
		<div style={style}>
			<p>By default :</p>
			<Slider />
			<p>With value & format</p>
			<Slider id="selectable" captionsFormat={functionToFormat} value={10} />
			<p>With disabled label</p>
			<Slider disabled />
			<p> with default value :</p>
			<Slider value={45} />
			<p> With a label:</p>
			<Slider value={null} captionIcons={icons} />
			<p> With a label:</p>
			<Slider value={50} captionIcons={icons} />
			<p>with some icons</p>
			<Slider value={40} captionTextStepNumber={4} captionsFormat={functionFormatFloor} />
			<p>with icon close to label</p>
			<Slider value={96} />
		</div>
	</section>
));
