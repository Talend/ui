import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import IconsProvider from '../../IconsProvider';

import InputDateTimeRangePicker from './InputDateTimeRangePicker.component';

const icons = {
	'talend-info-circle': talendIcons['talend-info-circle'],
	'talend-arrow-right': talendIcons['talend-arrow-right'],
	'talend-arrow-left': talendIcons['talend-arrow-left'],
};

storiesOf('Form/Controls/DatePicker/Date Time Range', module)
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
		<InputDateTimeRangePicker
			id="my-datetime-range-picker"
			onChange={action('onChange')}
			onBlur={action('onBlur')}
			useSeconds
		/>
	))
	.add('minWidth', () => (
    		<InputDateTimeRangePicker
    			id="my-datetime-range-picker"
    			onChange={action('onChange')}
    			onBlur={action('onBlur')}
    			useSeconds
                minWidthDate={200}
                minWidthTime={150}
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
