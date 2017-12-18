import React from 'react';
import { storiesOf } from '@storybook/react';

import { Slider, IconsProvider } from '../src/';

const icons = [
	'talend-smiley-rating',
	'talend-most-trusted',
	'talend-network',
	'talend-streams',
	'talend-tdc-negative',
];

const labelIcon = 'talend-logo-square';
const functionToFormat = value => `${value}-test`;
const functionFormatFloor = value => Math.floor(value);

storiesOf('Slider', module).addWithInfo('default', () => (
	<section>
		<IconsProvider />
		<p>By default :</p>
		<Slider id="selectable" captionsFormat={functionToFormat} value={10} />
		<p>With empty label</p>
		<Slider emptyValueLabel="empty value" />
		<p>With disabled label</p>
		<Slider disabled />
		<p> with default value :</p>
		<Slider value={45} emptyValueLabel="empty value" />
		<p> With a label:</p>
		<Slider value={50} label="Your value :" captionIcons={icons} />
		<p>with some icons</p>
		<Slider value={40} captionTextStepNumber={4} captionsFormat={functionFormatFloor} />
		<p>with icon close to label</p>
		<Slider value={96} labelIcon={labelIcon} />
	</section>
));
