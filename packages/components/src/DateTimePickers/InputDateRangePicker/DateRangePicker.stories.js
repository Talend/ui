import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '../../IconsProvider';

import InputDateRangePicker from './InputDateRangePicker.component';

import DateManager from '../Date/Manager';
import DatePicker from '../Date/Picker';

const icons = {
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-arrow-right': talendIcons['talend-arrow-right'],
};

storiesOf('Form/Controls/DatePicker/Date Range', module)
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
		<InputDateRangePicker
			id="my-date-picker"
			name="daterange"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
		/>
	))
	.add('Picker', () => (
		<div style={{ border: '1px solid black', width: 320 }}>
			<DateManager id="simple" onChange={action('onChange')}>
				<DatePicker selectedDate={new Date(2019, 9, 24)} endDate={new Date(2019, 9, 30)} />
			</DateManager>
		</div>
	));
