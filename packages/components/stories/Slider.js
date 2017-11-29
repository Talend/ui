import React from 'react';
import { storiesOf } from '@storybook/react';

import { Slider } from '../src/';

storiesOf('Slider', module).addWithInfo('default', () => (
	<section>
		<p>By default :</p>
		<Slider id="selectable" />
		<p> with default value :</p>
		<Slider defaultValue={50} />
	</section>
));
