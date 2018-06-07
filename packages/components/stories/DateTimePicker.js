import React from 'react';
import { storiesOf } from '@storybook/react';

import { DateTimeWrapper, MonthYearWrapper } from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Date/Time picker structure', () => (
		<div>
			<h1>Month Calendar structure</h1>
			<DateTimeWrapper />
		</div>
	))
	.add('Month/Year picker structure', () => (
		<div>
			<h1>Month Calendar structure</h1>
			<MonthYearWrapper />
		</div>
	));
