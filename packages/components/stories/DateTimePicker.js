import React from 'react';
import { storiesOf } from '@storybook/react';

import { MonthCalendar } from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Month Calendar structure', () => (
		<div>
			<h1>Month Calendar structure</h1>
			<MonthCalendar />
		</div>
	));
