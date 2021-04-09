import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputDateTimePicker from '.';

storiesOf('Deprecated/LegacyDteTimePicker', module)
	.add('Form mode - DateTime', () => {
		return (
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
			</React.Fragment>
		);
	})
	.add('Form mode - Hybrid DateTime', () => {
		return (
			<React.Fragment>
				<h3>Hybrid DateTime picker</h3>
				<p>For use when the independent input of date or time within one component is required</p>
				<div style={{ width: 200 }}>
					<div>With no preselected value</div>
					<InputDateTimePicker
						id="my-date-picker2"
						name="Datetime"
						onBlur={action('onBlur')}
						onChange={action('onChange')}
						useTime
						required={false}
						useSeconds
						hybridMode
						formMode
					/>
					<div>With preselected time</div>
					<InputDateTimePicker
						id="my-date-picker2"
						name="Datetime"
						onBlur={action('onBlur')}
						onChange={action('onChange')}
						useTime
						required={false}
						useSeconds
						hybridMode
						selectedDateTime={'14:33:00'}
						formMode
					/>
					<div>With preselected date</div>
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
		);
	});
