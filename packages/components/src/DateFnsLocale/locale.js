import { getCurrentLanguage } from '../translate';

export function buildDistanceInWordsLocale(t) {
	function localize(token, count, options = {}) {
		const distanceInWordsLocale = {
			lessThanXSeconds: t('DATE_FNS_LESS_THAN_SECONDS', {
				defaultValue: 'less than {{count}} seconds',
				count,
			}),
			xSeconds: t('DATE_FNS_SECOND', { defaultValue: '{{count}} seconds', count }),
			halfAMinute: t('DATE_FNS_HALF_A_MINUTE', { defaultValue: 'half a minute' }),
			lessThanXMinutes: t('DATE_FNS_LESS_THAN_MINUTES', {
				defaultValue: 'less than {{count}} minutes',
				count,
			}),
			xMinutes: t('DATE_FNS_ABOUT_MINUTE', { defaultValue: '{{count}} minutes', count }),
			aboutXHours: t('DATE_FNS_ABOUT_HOUR', { defaultValue: 'about {{count}} hours', count }),
			xHours: t('DATE_FNS_HOUR', { defaultValue: '{{count}} hours', count }),
			xDays: t('DATE_FNS_DAY', { defaultValue: '{{count}} days', count }),
			aboutXMonths: t('DATE_FNS_ABOUT_MONTH', { defaultValue: 'about {{count}} months', count }),
			xMonths: t('DATE_FNS_MONTH', { defaultValue: '{{count}} months', count }),
			aboutXYears: t('DATE_FNS_ABOUT_YEAR', { defaultValue: 'about {{count}} years', count }),
			xYears: t('DATE_FNS_YEAR', { defaultValue: '{{count}} years', count }),
			overXYears: t('DATE_FNS_OVER_YEAR', { defaultValue: 'over {{count}} years', count }),
			almostXYears: t('DATE_FNS_ALMOST_YEAR', { defaultValue: 'almost {{count}} years', count }),
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
		};
		language = getCurrentLanguage();
	}

	return locale;
}
