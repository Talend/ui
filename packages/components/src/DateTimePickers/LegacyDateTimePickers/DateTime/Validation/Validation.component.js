import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../../../constants';
import getDefaultT from '../../../../translate';
import { INPUT_ERRORS, HOUR_ERRORS, MINUTES_ERRORS, SECONDS_ERRORS } from '../constants';
import { DateTimeContext } from '../Context';
import Error from './Error.component';

import theme from './Validation.scss';

function Validation({ t }) {
	const { errorManagement } = useContext(DateTimeContext);
	const {
		errors,
		focusedInput,
		hoursErrorId,
		minutesErrorId,
		secondsErrorId,
		inputErrorId,
	} = errorManagement;

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
		<div className={theme.validation}>
			<div className={theme.errors}>
				<Error
					id={inputErrorId}
					key="input-errors"
					errors={errorsMapping[inputErrorId]}
					hidden={visibleErrors !== inputErrorId}
				/>
				<Error
					id={hoursErrorId}
					key="hours-errors"
					errors={errorsMapping[hoursErrorId]}
					hidden={visibleErrors !== hoursErrorId}
				/>
				<Error
					id={minutesErrorId}
					key="minutes-errors"
					errors={errorsMapping[minutesErrorId]}
					hidden={visibleErrors !== minutesErrorId}
				/>
				<Error
					id={secondsErrorId}
					key="seconds-errors"
					errors={errorsMapping[secondsErrorId]}
					hidden={visibleErrors !== secondsErrorId}
				/>
			</div>

			<button
				name="action-datepicker-validate"
				className="btn btn-primary"
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
Validation.displayName = 'DateTime.Validation';

Validation.propTypes = {
	t: PropTypes.func,
};

Validation.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(Validation);
