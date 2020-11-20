import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '../../IconsProvider';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';

storiesOf('Form/Controls/DatePicker/Date Time Range', module)
	.addDecorator(story => (
		<>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
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
		<InputDateTimeRangePicker
			id="my-datetime-range-picker"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
			useSeconds
		/>
	))
	.add('Default time', () => (
		<div>
			<InputDateTimeRangePicker
				id="my-datetime-range-picker"
				onChange={action('onChange')}
				defaultTimeStart={{
					hours: '00',
					minutes: '00',
					seconds: '00',
				}}
				defaultTimeEnd={{
					hours: '23',
					minutes: '59',
					seconds: '59',
				}}
				useSeconds
			/>
		</div>
	));
