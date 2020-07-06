import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '../../IconsProvider';

import InputDateTimePicker from './InputDateTimePicker.component';

const icons = {
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-arrow-right': talendIcons['talend-arrow-right'],
	'talend-arrow-left': talendIcons['talend-arrow-left'],
};

storiesOf('Form/Controls/DatePicker/DateTime', module)
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
		<InputDateTimePicker
			id="my-date-picker"
			name="datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value={new Date(2018, 4, 13, 12, 30, 44)}
		/>
	))
	.add('Text Input', () => (
		<InputDateTimePicker
			id="my-date-picker"
			name="datetime"
			onBlur={action('onBlur')}
			onChange={action('onChange')}
			value="2020-12-31 10:10"
		/>
	))
	.add('Default time ', () => (
		<InputDateTimePicker
			id="my-date-picker"
			name="datetime"
			onChange={action('onChange')}
			defaultTimeValue={{
				hours: '03',
				minutes: '04',
				seconds: '00',
			}}
		/>
	))
	.add('UTC', () => (
		<InputDateTimePicker
			id="my-datetime-picker"
			name="Datetime"
			onChange={action('onChange')}
			useUTC
		/>
	))
	.add('Timezone', () => (
		<InputDateTimePicker
			id="my-datetime-picker"
			name="datetime"
			onChange={action('onChange')}
			value={1569340800000}
		/>
	));
