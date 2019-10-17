// eslint-disable-next line import/no-named-as-default-member
import i18next from 'i18next';

export default function getErrorMessage(key) {
	switch (key) {
		case 'INVALID_HOUR_EMPTY':
			return i18next.t('INVALID_HOUR_EMPTY', { defaultValue: 'Hour is required' });
		case 'INVALID_HOUR_NUMBER':
			return i18next.t('INVALID_HOUR_NUMBER', { defaultValue: 'Hour must be between 00 and 23' });
		case 'INVALID_MINUTES_EMPTY':
			return i18next.t('INVALID_MINUTES_EMPTY', { defaultValue: 'Minutes are required' });
		case 'INVALID_MINUTES_NUMBER':
			return i18next.t('INVALID_MINUTES_NUMBER', {
				defaultValue: 'Minutes value must be between 00 and 59',
			});
		case 'INVALID_SECONDS_EMPTY':
			return i18next.t('INVALID_SECONDS_EMPTY', { defaultValue: 'Seconds are required' });
		case 'INVALID_SECONDS_NUMBER':
			return i18next.t('INVALID_SECONDS_NUMBER', {
				defaultValue: 'Seconds value must be between 00 and 59',
			});
		case 'INVALID_DATE_FORMAT':
			return i18next.t('INVALID_DATE_FORMAT', { defaultValue: 'Date format is invalid' });
		case 'INVALID_DATE_EMPTY':
			return i18next.t('INVALID_DATE_EMPTY', { defaultValue: 'Date is required' });
		case 'INVALID_MONTH_NUMBER':
			return i18next.t('INVALID_MONTH_NUMBER', { defaultValue: 'Month must be between 01 and 12' });
		case 'INVALID_DAY_NUMBER':
			return i18next.t('INVALID_DAY_NUMBER', { defaultValue: 'Day is invalid' });
		case 'INVALID_DAY_OF_MONTH':
			return i18next.t('INVALID_DAY_OF_MONTH', {
				defaultValue: "Day value doesn't match an existing day in the month",
			});
		case 'INVALID_TIME_EMPTY':
			return i18next.t('INVALID_TIME_EMPTY', {
				defaultValue: 'Time is required',
			});
		case 'TIME_FORMAT_INVALID':
			return i18next.t('TIME_FORMAT_INVALID', { defaultValue: 'Time is invalid' });
		case 'DATETIME_INVALID_FORMAT':
			return i18next.t('DATETIME_INVALID_FORMAT', { defaultValue: 'Datetime is invalid' });
		default:
			return '';
	}
}
