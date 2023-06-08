import { getCurrentLanguage } from '../../translate';
import buildFormatLocale from './formatters';

export function buildDistanceInWordsLocale(t) {
	function localize(token, count, options = {}) {
		const distanceInWordsLocale = {
			lessThanXSeconds: t('DATE_FNS_LESS_THAN_SECOND', {
				defaultValue: 'less than {{count}} second',
				defaultValue_other: 'less than {{count}} seconds',
				count,
			}),
			xSeconds: t('DATE_FNS_SECOND', {
				defaultValue: '{{count}} second',
				defaultValue_other: '{{count}} seconds',
				count,
			}),
			halfAMinute: t('DATE_FNS_HALF_A_MINUTE', { defaultValue: 'half a minute' }),
			lessThanXMinutes: t('DATE_FNS_LESS_THAN_MINUTE', {
				defaultValue: 'less than {{count}} minute',
				defaultValue_other: 'less than {{count}} minutes',
				count,
			}),
			xMinutes: t('DATE_FNS_ABOUT_MINUTE', {
				defaultValue: '{{count}} minute',
				defaultValue_other: '{{count}} minutes',
				count,
			}),
			aboutXHours: t('DATE_FNS_ABOUT_HOUR', {
				defaultValue: 'about {{count}} hour',
				defaultValue_other: 'about {{count}} hours',
				count,
			}),
			xHours: t('DATE_FNS_HOUR', {
				defaultValue: '{{count}} hour',
				defaultValue_other: '{{count}} hours',
				count,
			}),
			xDays: t('DATE_FNS_DAY', {
				defaultValue: '{{count}} day',
				defaultValue_other: '{{count}} days',
				count,
			}),
			aboutXMonths: t('DATE_FNS_ABOUT_MONTH', {
				defaultValue: 'about {{count}} month',
				defaultValue_other: 'about {{count}} months',
				count,
			}),
			xMonths: t('DATE_FNS_MONTH', {
				defaultValue: '{{count}} month',
				defaultValue_other: '{{count}} months',
				count,
			}),
			aboutXYears: t('DATE_FNS_ABOUT_YEAR', {
				defaultValue: 'about {{count}} year',
				defaultValue_other: 'about {{count}} years',
				count,
			}),
			xYears: t('DATE_FNS_YEAR', {
				defaultValue: '{{count}} year',
				defaultValue_other: '{{count}} years',
				count,
			}),
			overXYears: t('DATE_FNS_OVER_YEAR', {
				defaultValue: 'over {{count}} year',
				defaultValue_other: 'over {{count}} years',
				count,
			}),
			almostXYears: t('DATE_FNS_ALMOST_YEAR', {
				defaultValue: 'almost {{count}} year',
				defaultValue_other: 'almost {{count}} years',
				count,
			}),
		};

		const result = distanceInWordsLocale[token];

		if (!options.addSuffix) {
			return result;
		}

		if (options.comparison > 0) {
			return t('DATE_FNS_IN', { defaultValue: 'in {{value}}', value: result });
		}

		return t('DATE_FNS_AGO', { defaultValue: '{{value}} ago', value: result });
	}

	return {
		localize,
	};
}

let language;
let locale;

export default function getLocale(t) {
	const currentlanguage = getCurrentLanguage();
	if (language !== currentlanguage) {
		locale = {
			distanceInWords: buildDistanceInWordsLocale(t),
			format: buildFormatLocale(t),
		};
		language = getCurrentLanguage();
	}

	return locale;
}
