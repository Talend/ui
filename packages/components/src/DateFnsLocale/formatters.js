/* eslint-disable new-cap */
const commonFormatterKeys = [
	'M',
	'MM',
	'Q',
	'D',
	'DD',
	'DDD',
	'DDDD',
	'd',
	'E',
	'W',
	'WW',
	'YY',
	'YYYY',
	'GG',
	'GGGG',
	'H',
	'HH',
	'h',
	'hh',
	'm',
	'mm',
	's',
	'ss',
	'S',
	'SS',
	'SSS',
	'Z',
	'ZZ',
	'X',
	'x',
];

function buildFormattingTokensRegExp(formatters) {
	const formatterKeys = [];
	Object.keys(formatters).forEach(key => {
		formatterKeys.push(key);
	});

	const formattingTokens = commonFormatterKeys
		.concat(formatterKeys)
		.sort()
		.reverse();
	const formattingTokensRegExp = new RegExp(
		`(\\[[^\\[]*\\])|(\\\\)?(${formattingTokens.join('|')}|.)`,
		'g',
	);

	return formattingTokensRegExp;
}

// depends of the locale
// might be hard to customize this they way we do translation on the lib
function masculineOrdinal() {
	return '';
}

function feminineOrdinal() {
	return '';
}

function buildFormatLocale(t) {
	const months3char = [
		t('DATE_FNS_JANUARY_3CHAR', { defaultValue: 'Jan' }),
		t('DATE_FNS_FEBRUARY_3CHAR', { defaultValue: 'Feb' }),
		t('DATE_FNS_MARCH_3CHAR', { defaultValue: 'Mar' }),
		t('DATE_FNS_APRIL_3CHAR', { defaultValue: 'Apr' }),
		t('DATE_FNS_MAY_3CHAR', { defaultValue: 'May' }),
		t('DATE_FNS_JUNE_3CHAR', { defaultValue: 'Jun' }),
		t('DATE_FNS_JULY_3CHAR', { defaultValue: 'Jul' }),
		t('DATE_FNS_AUGUST_3CHAR', { defaultValue: 'Aug' }),
		t('DATE_FNS_SEPTEMBER_3CHAR', { defaultValue: 'Sep' }),
		t('DATE_FNS_OCTOBER_3CHAR', { defaultValue: 'Oct' }),
		t('DATE_FNS_NOVEMBER_3CHAR', { defaultValue: 'Nov' }),
		t('DATE_FNS_DECEMBER_3CHAR', { defaultValue: 'Dec' }),
	];
	const monthsFull = [
		t('DATE_FNS_JANUARY_FULL', { defaultValue: 'January' }),
		t('DATE_FNS_FEBRUARY_FULL', { defaultValue: 'February' }),
		t('DATE_FNS_MARCH_FULL', { defaultValue: 'March' }),
		t('DATE_FNS_APRIL_FULL', { defaultValue: 'April' }),
		t('DATE_FNS_MAY_FULL', { defaultValue: 'May' }),
		t('DATE_FNS_JUNE_FULL', { defaultValue: 'June' }),
		t('DATE_FNS_JULY_FULL', { defaultValue: 'July' }),
		t('DATE_FNS_AUGUST_FULL', { defaultValue: 'August' }),
		t('DATE_FNS_SEPTEMBER_FULL', { defaultValue: 'September' }),
		t('DATE_FNS_OCTOBER_FULL', { defaultValue: 'October' }),
		t('DATE_FNS_NOVEMBER_FULL', { defaultValue: 'November' }),
		t('DATE_FNS_DECEMBER_FULL', { defaultValue: 'December' }),
	];
	const weekdays1char = [
		t('DATE_FNS_SUNDAY_1CHAR', { defaultValue: 'S' }),
		t('DATE_FNS_MONDAY_1CHAR', { defaultValue: 'M' }),
		t('DATE_FNS_TUESDAY_1CHAR', { defaultValue: 'T' }),
		t('DATE_FNS_WEDNESDAY_1CHAR', { defaultValue: 'W' }),
		t('DATE_FNS_THURSDAY_1CHAR', { defaultValue: 'T' }),
		t('DATE_FNS_FRIDAY_1CHAR', { defaultValue: 'F' }),
		t('DATE_FNS_SATURDAY_1CHAR', { defaultValue: 'S' }),
	];
	const weekdays2char = [
		t('DATE_FNS_SUNDAY_2CHAR', { defaultValue: 'Su' }),
		t('DATE_FNS_MONDAY_2CHAR', { defaultValue: 'Mo' }),
		t('DATE_FNS_TUESDAY_2CHAR', { defaultValue: 'Tu' }),
		t('DATE_FNS_WEDNESDAY_2CHAR', { defaultValue: 'We' }),
		t('DATE_FNS_THURSDAY_2CHAR', { defaultValue: 'Th' }),
		t('DATE_FNS_FRIDAY_2CHAR', { defaultValue: 'Fr' }),
		t('DATE_FNS_SATURDAY_2CHAR', { defaultValue: 'Sa' }),
	];
	const weekdays3char = [
		t('DATE_FNS_SUNDAY_3CHAR', { defaultValue: 'Sun' }),
		t('DATE_FNS_MONDAY_3CHAR', { defaultValue: 'Mon' }),
		t('DATE_FNS_TUESDAY_3CHAR', { defaultValue: 'Tue' }),
		t('DATE_FNS_WEDNESDAY_3CHAR', { defaultValue: 'Wed' }),
		t('DATE_FNS_THURSDAY_3CHAR', { defaultValue: 'Thu' }),
		t('DATE_FNS_FRIDAY_3CHAR', { defaultValue: 'Fri' }),
		t('DATE_FNS_SATURDAY_3CHAR', { defaultValue: 'Sat' }),
	];
	const weekdaysFull = [
		t('DATE_FNS_SUNDAY_FULL', { defaultValue: 'Sunday' }),
		t('DATE_FNS_MONDAY_FULL', { defaultValue: 'Monday' }),
		t('DATE_FNS_TUESDAY_FULL', { defaultValue: 'Tuesday' }),
		t('DATE_FNS_WEDNESDAY_FULL', { defaultValue: 'Wednesday' }),
		t('DATE_FNS_THURSDAY_FULL', { defaultValue: 'Thursday' }),
		t('DATE_FNS_FRIDAY_FULL', { defaultValue: 'Friday' }),
		t('DATE_FNS_SATURDAY_FULL', { defaultValue: 'Saturday' }),
	];
	const meridiemUppercase = [
		t('DATE_FNS_MERIDIEM_UPPERCASE_AM', { defaultValue: 'AM' }),
		t('DATE_FNS_MERIDIEM_UPPERCASE_PM', { defaultValue: 'PM' }),
	];
	const meridiemLowercase = [
		t('DATE_FNS_MERIDIEM_LOWERCASE_AM', { defaultValue: 'am' }),
		t('DATE_FNS_MERIDIEM_LOWERCASE_PM', { defaultValue: 'pm' }),
	];
	const meridiemFull = [
		t('DATE_FNS_MERIDIEM_FULL_AM', { defaultValue: 'a.m.' }),
		t('DATE_FNS_MERIDIEM_FULL_PM', { defaultValue: 'p.m.' }),
	];
	const formatters = {
		// Month: Jan, Feb, …, Dec
		MMM: date => months3char[date.getMonth()],

		// Month: January, February, …, December
		MMMM: date => monthsFull[date.getMonth()],

		// Day of week: S, M, …, S
		d: date => weekdays1char[date.getDay()],

		// Day of week: Su, Mo, …, Sa
		dd: date => weekdays2char[date.getDay()],

		// Day of week: Sun, Mon, …, Sat
		ddd: date => weekdays3char[date.getDay()],

		// Day of week: Sunday, Monday, …, Saturday
		dddd: date => weekdaysFull[date.getDay()],

		// AM, PM
		A: date => (date.getHours() / 12 >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]),

		// am, pm
		a: date => (date.getHours() / 12 >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]),

		// a.m., p.m.
		aa: date => {
			const hours = date.getHours();

			if (hours <= 12) {
				return meridiemFull[0];
			}

			if (hours <= 16) {
				return meridiemFull[1];
			}

			return meridiemFull[2];
		},

		// ISO week, ordinal version: 1st, 2nd, …, 53rd
		// NOTE: Week has feminine grammatical gender in French: semaine
		Wo: (date, allFormatters) => feminineOrdinal(allFormatters.W(date)),
	};

	// Generate ordinal version of formatters: M → Mo, D → Do, etc.
	// NOTE: For words with masculine grammatical gender in French: mois, jour, trimestre
	const formatterTokens = ['M', 'D', 'DDD', 'd', 'Q'];
	formatterTokens.forEach(formatterToken => {
		formatters[`${formatterToken}o`] = (date, formatter) =>
			masculineOrdinal(formatter[formatterToken](date));
	});

	// Special case for day of month ordinals in long date format context:
	// 1er mars, 2 mars, 3 mars, …
	// See https://github.com/date-fns/date-fns/issues/437
	//
	// NOTE: The below implementation works because parsing of tokens inside a
	// format string is done by a greedy regular expression, i.e. longer tokens
	// have priority. E.g. formatter for "Do MMMM" has priority over individual
	// formatters for "Do" and "MMMM".
	const monthsTokens = ['MMM', 'MMMM'];
	monthsTokens.forEach(monthToken => {
		formatters[`Do ${monthToken}`] = (date, commonFormatters) => {
			const dayOfMonthToken = date.getDate() === 1 ? 'Do' : 'D';
			const dayOfMonthFormatter = formatters[dayOfMonthToken] || commonFormatters[dayOfMonthToken];

			return `${dayOfMonthFormatter(date, commonFormatters)} ${formatters[monthToken](date)}`;
		};
	});

	return {
		formatters,
		formattingTokensRegExp: buildFormattingTokensRegExp(formatters),
	};
}

export default buildFormatLocale;
