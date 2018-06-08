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
			<div style={{ width: '350px' }}>
				<DateTimePicker />
			</div>
		</div>
	))
	.add('Date/Time view structure', () => (
		<div>
			<h1>Date/Time structure</h1>
			<div style={{ width: '350px' }}>
				<DateTimeView />
			</div>
		</div>
	))
	.add('Month/Year view structure', () => (
		<div>
			<h1>Month/Year structure</h1>
			<div style={{ width: '350px' }}>
				<MonthYearView />
			</div>
		</div>
	));
