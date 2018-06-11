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
			<div style={{ width: '320px' }}>
				<DateTimePicker />
			</div>
		</div>
	))
	.add('Date/Time view structure', () => (
		<div>
			<h1>Date/Time structure</h1>
			<IconsProvider />
			<div style={{ width: '320px' }}>
				<DateTimeView />
			</div>
		</div>
	))
	.add('Month/Year view structure', () => (
		<div>
			<h1>Month/Year structure</h1>
			<IconsProvider />
			<div style={{ width: '320px' }}>
				<MonthYearView />
			</div>
		</div>
	));
