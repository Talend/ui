import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src/index';

import DateTimePicker, {
	DateTimeView,
	MonthYearView,
} from '../src/DateTimePickers';


storiesOf('DateTimePicker', module)
	.add('Full DateTimePicker structure', () => (
		<div>
			<h1>DateTimePicker structure</h1>
			<IconsProvider />
			<div style={{ width: '320px', border: '1px solid black' }}>
				<DateTimePicker />
			</div>
		</div>
	))
	.add('Date/Time view structure', () => (
		<div>
			<h1>Date/Time structure</h1>
			<IconsProvider />
			<div style={{ width: '320px', height: '25rem', border: '1px solid black' }}>
				<DateTimeView />
			</div>
		</div>
	))
	.add('Month/Year view structure', () => (
		<div>
			<h1>Month/Year structure</h1>
			<IconsProvider />
			<div style={{ width: '320px', height: '25rem', border: '1px solid black' }}>
				<MonthYearView />
			</div>
		</div>
	));
