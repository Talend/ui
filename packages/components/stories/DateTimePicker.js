import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IconsProvider } from '../src/index';

import DateTimePicker, { InputDateTimePicker } from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('InputDateTimePicker', () => (
		<div>
			<h1>InputDateTimePicker</h1>
			<IconsProvider />

			<div>
				<InputDateTimePicker
					selectedDateTime={new Date(2018, 4, 13, 12, 30)}
					onChange={action('onChange (DateTime)')}
					onError={action('onError (message)')}
					inputProps={{
						name: 'Datetime',
					}}
				/>
			</div>
		</div>
	))
	.add('DateTimePicker', () => (
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
				<DateTimePicker
					onSubmit={action('onSubmit (Date and time)')}
				/>
			</div>
		</div>
	));
