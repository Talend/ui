import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';

import InputDatePicker from '../InputDatePicker';
import InputTimePicker from '../InputTimePicker';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';

import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './InputDateTimePicker.scss';

function InputDateTimePicker(props) {
	if (!props.selectedDateTime) {
		// eslint-disable-next-line no-console
		console.warn(
			'Warning: "selectedDateTime" is deprecated and will be removed in the next major version. Use "value" instead please.',
		);
	}
	return (
		<DateTime.Manager
			id={props.id}
			value={props.value || props.selectedDateTime}
			useSeconds={props.useSeconds}
			useUTC={props.useUTC}
			onChange={props.onChange}
		>
			<DateTimeContext.Consumer>
				{({ date, time, onDateChange, onTimeChange }) => (
					<div className={theme['date-time-picker']}>
						<InputDatePicker
							id={`${props.id}-date-picker`}
							onChange={onDateChange}
							dateFormat={props.dateFormat}
							value={date}
						/>
						<InputTimePicker
							id={`${props.id}-time-picker`}
							onChange={onTimeChange}
							useSeconds={props.useSeconds}
							value={time}
						/>
						{props.timezone && (
							<TooltipTrigger
								label={props.t('DATE_TIME_PICKER_TIMEZONE', {
									defaultValue: 'Timezone: {{timezone}}',
									timezone: props.timezone,
								})}
								tooltipPlacement="top"
								style={{ display: 'block' }}
							>
								<Icon name="talend-info-circle" />
							</TooltipTrigger>
						)}
					</div>
				)}
			</DateTimeContext.Consumer>
		</DateTime.Manager>
	);
}
InputDateTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	selectedDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
	timezone: PropTypes.string,
	t: PropTypes.func.isRequired,
};

InputDateTimePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useUTC: false,
	// default behaviour is to forbid empty values
	required: true,
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(InputDateTimePicker);
