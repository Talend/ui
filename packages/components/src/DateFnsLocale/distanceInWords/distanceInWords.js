function buildDistanceInWords(t) {
	return {
		lessThanXSeconds: {
			one: t('DATE_FNS_LESS_THAN_SECOND', { defaultValue: 'less than a second' }),
			other: t('DATE_FNS_LESS_THAN_SECOND_plural', { defaultValue: 'less than [count] seconds' }),
		},

		xSeconds: {
			one: t('DATE_FNS_SECOND', { defaultValue: '1 second' }),
			other: t('DATE_FNS_SECOND_plural', { defaultValue: '[count] seconds' }),
		},

		halfAMinute: t('DATE_FNS_HALF_A_MINUTE', { defaultValue: 'half a minute' }),

		lessThanXMinutes: {
			one: t('DATE_FNS_LESS_THAN_MINUTE', { defaultValue: 'less than a minute' }),
			other: t('DATE_FNS_LESS_THAN_MINUTE_plural', { defaultValue: 'less than [count] minutes' }),
		},

		xMinutes: {
			one: t('DATE_FNS_MINUTE', { defaultValue: '1 minute' }),
			other: t('DATE_FNS_MINUTE_plural', { defaultValue: '[count] minutes' }),
		},

		aboutXHours: {
			one: t('DATE_FNS_ABOUT_HOUR', { defaultValue: 'about 1 hour' }),
			other: t('DATE_FNS_ABOUT_HOUR_plural', { defaultValue: 'about [count] hours' }),
		},

		xHours: {
			one: t('DATE_FNS_HOUR', { defaultValue: '1 hour' }),
			other: t('DATE_FNS_HOUR_plural', { defaultValue: '[count] hours' }),
		},

		xDays: {
			one: t('DATE_FNS_DAY', { defaultValue: '1 day' }),
			other: t('DATE_FNS_DAY_plural', { defaultValue: '[count] days' }),
		},

		aboutXMonths: {
			one: t('DATE_FNS_ABOUT_MONTH', { defaultValue: 'about 1 month' }),
			other: t('DATE_FNS_ABOUT_MONTH_plural', { defaultValue: 'about [count] months' }),
		},

		xMonths: {
			one: t('DATE_FNS_MONTH', { defaultValue: '1 month' }),
			other: t('DATE_FNS_MONTH_plural', { defaultValue: '[count] months' }),
		},

		aboutXYears: {
			one: t('DATE_FNS_ABOUT_YEAR', { defaultValue: 'about 1 year' }),
			other: t('DATE_FNS_ABOUT_YEAR_plural', { defaultValue: 'about [count] years' }),
		},

		xYears: {
			one: t('DATE_FNS_YEAR', { defaultValue: '1 year' }),
			other: t('DATE_FNS_YEAR_plural', { defaultValue: '[count] years' }),
		},

		overXYears: {
			one: t('DATE_FNS_OVER_YEAR', { defaultValue: 'over 1 year' }),
			other: t('DATE_FNS_OVER_YEAR_plural', { defaultValue: 'over [count] years' }),
		},

		almostXYears: {
			one: t('DATE_FNS_ALMOST_YEAR', { defaultValue: 'almost 1 year' }),
			other: t('DATE_FNS_ALMOST_YEAR_plural', { defaultValue: 'almost [count] years' }),
		},
	};
}

export default function buildDistanceInWordsLocale(t) {
	const distanceInWords = buildDistanceInWords(t);
	function localize(token, count, options = {}) {
		let result;
		if (typeof distanceInWords[token] === 'string') {
			result = distanceInWords[token];
		} else if (count === 1) {
			result = distanceInWords[token].one;
		} else {
			result = distanceInWords[token].other.replace('[count]', count);
		}

		if (options.addSuffix) {
			if (options.comparison > 0) {
				return t('DATE_FNS_IN', { defaultValue: 'in {{value}}', value: result });
			}
			return t('DATE_FNS_AGO', { defaultValue: '{{value}} ago', value: result });
		}
		return result;
	}

	return {
		localize,
	};
}
