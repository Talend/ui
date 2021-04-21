import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputDateTimePicker from '.';

storiesOf('Deprecated/LegacyDteTimePicker', module).add('Legacy - form mode', () => (
	<React.Fragment>
		<div style={{ width: 150 }}>
			<div> in form mode with validation and submit </div>
			<InputDateTimePicker
				id="my-date-picker"
				name="Datetime"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				useTime
				formMode
				required={false}
				useSeconds
			/>
		</div>
		<div style={{ width: 150 }}>
			<div> in form mode in hybrid mode </div>
			<InputDateTimePicker
				id="my-date-picker2"
				name="Datetime"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				useTime
				required={false}
				useSeconds
				hybridMode
				selectedDateTime={'::00'}
				formMode
			/>
			<InputDateTimePicker
					id="my-date-picker3"
					name="Datetime"
					onBlur={action('onBlur')}
					onChange={action('onChange')}
					useTime
					required={false}
					useSeconds
					hybridMode
					selectedDateTime={'2012-12-12'}
					formMode
				/>
		</div>
	</React.Fragment>
));
