import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import theme from './InputDateTimePicker.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import { INPUT_ERRORS, HOUR_ERRORS, MINUTES_ERRORS, SECONDS_ERRORS } from './constants';

function Error(props) {
	const classNames = classnames({ 'sr-only': props.hidden });
	return (
		<div id={props.id} className={classNames}>
			{props.errors.map((error, index) => (
				<span key={index}>{error.message}</span>
			))}
		</div>
	);
}
Error.propTypes = {
	id: PropTypes.string,
	errors: PropTypes.array,
	hidden: PropTypes.bool,
};

function DateTimeValidation({
	t,
	errors,
	focusedInput,
	hoursErrorId,
	minutesErrorId,
	secondsErrorId,
	inputErrorId,
}) {
	return (
		<div className={theme.footer}>
			<div className={theme.errors}>
				<Error
					id={inputErrorId}
					key="input-errors"
					errors={errors.filter(error => INPUT_ERRORS.includes(error.code))}
					hidden={focusedInput !== inputErrorId}
				/>
				<Error
					id={hoursErrorId}
					key="hours-errors"
					errors={errors.filter(error => HOUR_ERRORS.includes(error.code))}
					hidden={focusedInput !== hoursErrorId}
				/>
				<Error
					id={minutesErrorId}
					key="minutes-errors"
					errors={errors.filter(error => MINUTES_ERRORS.includes(error.code))}
					hidden={focusedInput !== minutesErrorId}
				/>
				<Error
					id={secondsErrorId}
					key="seconds-errors"
					errors={errors.filter(error => SECONDS_ERRORS.includes(error.code))}
					hidden={focusedInput !== secondsErrorId}
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
