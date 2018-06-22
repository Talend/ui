import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src/index';

import DateTimePicker from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Full DateTimePicker', () => (
		<div>
			<h1>DateTimePicker</h1>
			<IconsProvider />
			<ul>
				<li>Width is defined by the parent (here fixed to 320px) but is responsive </li>
				<li>Height is responsive relatively to the default font-size</li>
				<li>The outer border style (black) is here just as visual
					shape indication, it's not part of the component rendered</li>
			</ul>

			<div style={{ width: '320px', border: '1px solid black' }}>
				<DateTimePicker />
			</div>
		</div>
	));
