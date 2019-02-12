import React from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

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

function Error({ hidden, errors, id, t }) {
	const classNames = classnames({ 'sr-only': hidden });
	return (
		<div id={id} className={classNames}>
			{errors.map((error, index) => <span key={index}>{getDateErrorLabel(t, error.message)}</span>)}
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

export default translate(I18N_DOMAIN_COMPONENTS)(Error);
