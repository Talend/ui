import { getCurrentLanguage } from '../translate';
import buildFormatLocale from './formatters';

export function buildDistanceInWordsLocale(t) {
	function localize(token, count, options = {}) {
		const distanceInWordsLocale = {
			lessThanXSeconds: t('DATE_FNS_LESS_THAN_SECOND', {
				defaultValue: 'less than {{count}} second',
				count,
			}),
			xSeconds: t('DATE_FNS_SECOND', { defaultValue: '{{count}} second', count }),
			halfAMinute: t('DATE_FNS_HALF_A_MINUTE', { defaultValue: 'half a minute' }),
			lessThanXMinutes: t('DATE_FNS_LESS_THAN_MINUTE', {
				defaultValue: 'less than {{count}} minute',
				count,
			}),
			xMinutes: t('DATE_FNS_ABOUT_MINUTE', { defaultValue: '{{count}} minute', count }),
			aboutXHours: t('DATE_FNS_ABOUT_HOUR', { defaultValue: 'about {{count}} hour', count }),
			xHours: t('DATE_FNS_HOUR', { defaultValue: '{{count}} hour', count }),
			xDays: t('DATE_FNS_DAY', { defaultValue: '{{count}} day', count }),
			aboutXMonths: t('DATE_FNS_ABOUT_MONTH', { defaultValue: 'about {{count}} month', count }),
			xMonths: t('DATE_FNS_MONTH', { defaultValue: '{{count}} month', count }),
			aboutXYears: t('DATE_FNS_ABOUT_YEAR', { defaultValue: 'about {{count}} year', count }),
			xYears: t('DATE_FNS_YEAR', { defaultValue: '{{count}} year', count }),
			overXYears: t('DATE_FNS_OVER_YEAR', { defaultValue: 'over {{count}} year', count }),
			almostXYears: t('DATE_FNS_ALMOST_YEAR', { defaultValue: 'almost {{count}} year', count }),
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
