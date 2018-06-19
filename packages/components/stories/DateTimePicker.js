import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src/index';

import DateTimePicker from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Full DateTimePicker structure', () => (
		<div>
			<h1>DateTimePicker structure</h1>
			<IconsProvider />
			<div style={{ width: '320px', border: '1px solid black' }}>
				<DateTimePicker />
			</div>
		</div>
	));
