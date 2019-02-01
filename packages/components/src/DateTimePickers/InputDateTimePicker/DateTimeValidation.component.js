import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import theme from './InputDateTimePicker.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import { INPUT_ERRORS, HOUR_ERRORS, MINUTES_ERRORS, SECONDS_ERRORS } from './constants';

function getDateErrorLabel(t, errorMessage) {
	switch (errorMessage) {
		case 'INVALID_HOUR_EMPTY':
			return t('INVALID_HOUR_EMPTY', { defaultValue: 'Hour is required' });
		case 'INVALID_HOUR_NUMBER':
			return t('INVALID_HOUR_NUMBER', { defaultValue: 'Hour must be between 00 and 23' });
		case 'INVALID_MINUTES_EMPTY':
			return t('INVALID_MINUTES_EMPTY', { defaultValue: 'Minutes are required' });
		case 'INVALID_MINUTES_NUMBER':
			return t('INVALID_MINUTES_NUMBER', {
				defaultValue: 'Minutes value must be between 00 and 59',
			});
		case 'INVALID_SECONDS_EMPTY':
			return t('INVALID_SECONDS_EMPTY', { defaultValue: 'Seconds are required' });
		case 'INVALID_SECONDS_NUMBER':
			return t('INVALID_SECONDS_NUMBER', {
				defaultValue: 'Seconds value must be between 00 and 59',
			});
		case 'INVALID_DATE_FORMAT':
			return t('INVALID_DATE_FORMAT', { defaultValue: 'Date format is invalid' });
		case 'INVALID_MONTH_NUMBER':
			return t('INVALID_MONTH_NUMBER', { defaultValue: 'Month must be between 01 and 12' });
		case 'INVALID_DAY_NUMBER':
			return t('INVALID_DAY_NUMBER', { defaultValue: 'Day is invalid' });
		case 'INVALID_DAY_OF_MONTH':
			return t('INVALID_DAY_OF_MONTH', {
				defaultValue: "Day value doesn't match an existing day in the month",
			});
		case 'TIME_FORMAT_INVALID':
			return t('TIME_FORMAT_INVALID', { defaultValue: 'Time is invalid' });
		case 'DATETIME_INVALID_FORMAT':
			return t('DATETIME_INVALID_FORMAT', { defaultValue: 'Datetime is invalid' });
		default:
			return '';
	}
}

export function Error({ hidden, errors, id, t }) {
	const classNames = classnames({ 'sr-only': hidden });
	return (
		<div id={id} className={classNames}>
			{errors.map((error, index) => (
				<span key={index}>{getDateErrorLabel(t, error.message)}</span>
			))}
		</div>
	);
}
Error.propTypes = {
	id: PropTypes.string,
	errors: PropTypes.array,
	hidden: PropTypes.bool,
	t: PropTypes.func,
};

Error.defaultProps = {
	t: getDefaultT(),
};

const TranslatedError = translate(I18N_DOMAIN_COMPONENTS)(Error);

export function DateTimeValidation({
	t,
	errors,
	focusedInput,
	hoursErrorId,
	minutesErrorId,
	secondsErrorId,
	inputErrorId,
}) {
	const errorsOrder = [inputErrorId, hoursErrorId, minutesErrorId, secondsErrorId];
	const errorsMapping = {
		[inputErrorId]: errors.filter(error => INPUT_ERRORS.includes(error.code)),
		[hoursErrorId]: errors.filter(error => HOUR_ERRORS.includes(error.code)),
		[minutesErrorId]: errors.filter(error => MINUTES_ERRORS.includes(error.code)),
		[secondsErrorId]: errors.filter(error => SECONDS_ERRORS.includes(error.code)),
	};

	let visibleErrors = focusedInput;
	if (!visibleErrors) {
		visibleErrors = errorsOrder.find(part => errorsMapping[part].length);
	}

	return (
		<div className={theme.footer}>
			<div className={theme.errors}>
				<TranslatedError
					id={inputErrorId}
					key="input-errors"
					errors={errorsMapping[inputErrorId]}
					hidden={visibleErrors !== inputErrorId}
				/>
				<TranslatedError
					id={hoursErrorId}
					key="hours-errors"
					errors={errorsMapping[hoursErrorId]}
					hidden={visibleErrors !== hoursErrorId}
				/>
				<TranslatedError
					id={minutesErrorId}
					key="minutes-errors"
					errors={errorsMapping[minutesErrorId]}
					hidden={visibleErrors !== minutesErrorId}
				/>
				<TranslatedError
					id={secondsErrorId}
					key="seconds-errors"
					errors={errorsMapping[secondsErrorId]}
					hidden={visibleErrors !== secondsErrorId}
				/>
			</div>

			<button
				name="action-datepicker-validate"
				className="btn btn-primary"
				role="button"
				type="submit"
				aria-label={t('DATEPICKER_VALIDATE_DESC', {
					defaultValue: 'Validate the date picker value',
				})}
			>
				{t('DATEPICKER_VALIDATE', { defaultValue: 'Done' })}
			</button>
		</div>
	);
}

DateTimeValidation.propTypes = {
	t: PropTypes.func,
	errors: PropTypes.arrayOf(
		PropTypes.shape({
			component: PropTypes.string,
			componentId: PropTypes.string,
		}),
	),
	focusedInput: PropTypes.string,
	hoursErrorId: PropTypes.string,
	minutesErrorId: PropTypes.string,
	secondsErrorId: PropTypes.string,
	inputErrorId: PropTypes.string,
};

DateTimeValidation.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(DateTimeValidation);
