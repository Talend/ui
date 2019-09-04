// eslint-disable-next-line import/no-named-as-default-member
import i18next from 'i18next';

export default function getErrorMessage(key) {
	switch (key) {
		case 'INVALID_DATE_FORMAT':
			return i18next.t('INVALID_DATE_FORMAT', { defaultValue: 'Date format is invalid' });
		case 'INVALID_MONTH_NUMBER':
			return i18next.t('INVALID_MONTH_NUMBER', { defaultValue: 'Month must be between 01 and 12' });
		case 'INVALID_DAY_NUMBER':
			return i18next.t('INVALID_DAY_NUMBER', { defaultValue: 'Day is invalid' });
		case 'INVALID_DAY_OF_MONTH':
			return i18next.t('INVALID_DAY_OF_MONTH', {
				defaultValue: "Day value doesn't match an existing day in the month",
			});
		default:
			return '';
	}
}
