import React from 'react';
import { storiesOf } from '@storybook/react';

import {
	DateTimeView,
	MonthYearView,
	DateTimePicker,
} from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Full DateTimePicker structure', () => (
		<div>
			<h1>DateTimePicker structure</h1>
			<DateTimePicker />
		</div>
	))
	.add('Date/Time view structure', () => (
		<div>
			<h1>Date/Time structure</h1>
			<DateTimeView />
		</div>
	))
	.add('Month/Year view structure', () => (
		<div>
			<h1>Month/Year structure</h1>
			<MonthYearView />
		</div>
	));
