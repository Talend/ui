import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '../../IconsProvider';

import InputDatePicker from './InputDatePicker.component';

import DateManager from '../Date/Manager';
import DatePicker from '../Date/Picker';

const icons = {
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-arrow-right': talendIcons['talend-arrow-right'],
	'talend-arrow-left': talendIcons['talend-arrow-left'],
};

storiesOf('Form/Controls/DatePicker/Date', module)
	.addDecorator(story => (
		<>
			<IconsProvider defaultIcons={icons} />
			<form
				onSubmit={event => {
					event.persist();
					event.preventDefault();
					action('submit')(event);
				}}
			>
				{story()}
			</form>
		</>
	))
	.add('Input', () => (
		<InputDatePicker
			id="my-date-picker"
			name="date"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
		/>
	))
	.add('Picker', () => (
		<div style={{ border: '1px solid black', width: '32rem' }}>
			<DateManager id="simple" onChange={action('onChange', { depth: 3 })}>
				<DatePicker />
			</DateManager>
		</div>
	))
	.add('UTC', () => (
		<InputDatePicker id="my-date-picker" name="date" onChange={action('onChange')} useUTC />
	))
	.add('Timezone', () => (
		<InputDatePicker
			id="my-date-picker"
			name="date"
			onChange={action('onChange')}
			timezone="Europe/Berlin"
		/>
	))
	.add('Custom format', () => (
		<div>
			<p>
				Date picker can accept a custom date format if it's a composition of DD, MM, YYYY only.
				<br />
				Once date-fns parse() accept a format (scheduled for 2.0), we can remove this specific code
				and accept any format.
				<br />
				<br />
				Here we set date format to: DD/MM/YYYY. (default is YYYY-MM-DD)
			</p>
			<InputDatePicker
				id="my-date-picker"
				name="date"
				onChange={action('onChange')}
				dateFormat="DD/MM/YYYY"
			/>
		</div>
	))
	.add('min width', () => (
		<div>
			<p>Date picker a minimal width for the input</p>
			<InputDatePicker
				id="my-date-picker"
				name="date"
				onChange={action('onChange')}
				dateFormat="DD/MM/YYYY"
				minWidth={250}
			/>
		</div>
	))
	.add('Container overflow', () => (
		<div style={{ height: 300, overflow: 'auto', border: 'solid', marginTop: 100 }}>
			<div
				style={{
					height: 400,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
				}}
			>
				<InputDatePicker id="my-date-picker-top-left" name="date1" onChange={action('onChange')} />
				<InputDatePicker id="my-date-picker-top-right" name="date2" onChange={action('onChange')} />
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<InputDatePicker
					id="my-date-picker-bottom-left"
					name="date3"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
				/>
				<InputDatePicker
					id="my-date-picker-bottom-right"
					name="date4"
					onChange={action('onChange')}
				/>
			</div>
		</div>
	));
