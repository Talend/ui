import React from 'react';
import { storiesOf } from '@storybook/react';

import {
	DateTimeWrapper,
	MonthYearWrapper,
	DateTimePicker,
} from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('DateTimePicker structure', () => (
		<div>
			<h1>DateTimePickers structure</h1>
			<DateTimePicker />
		</div>
	))
	.add('Date/Time picker structure', () => (
		<div>
			<h1>Date/Time structure</h1>
			<DateTimeWrapper />
		</div>
	))
	.add('Month/Year picker structure', () => (
		<div>
			<h1>Month/Year structure</h1>
			<MonthYearWrapper />
		</div>
	));
