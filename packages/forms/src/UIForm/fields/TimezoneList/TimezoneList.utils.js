import get from 'lodash/get';
import { getCdnUrl } from '../../../cdn';

/**
 * Get the offset between a timezone and the UTC time (in minutes)
 * @param {String} timeZone Timezone IANA name
 * @returns {Number}
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export function getTimezoneUTCOffset(timeZone) {
	// Build localized formats for UTC and the target timezone
	const formatOptions = {
		hourCycle: 'h23',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	const locale = 'en-US';
	const utcFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone: 'Etc/UTC' });
	const timezoneFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone });

	// Create the same date in UTC timezone and the target timezone
	const date = new Date();
	const utcDate = new Date(utcFormat.format(date));
	const timezoneDate = new Date(timezoneFormat.format(date));

	// Compute delta between dates
	return (timezoneDate - utcDate) / (1000 * 60);
}

/**
 * Ensure a numeric value is expressed on two digits (01, 02, 10 ...)
 * @param {Number} value
 * @returns {String}
 */
function padTwoDigits(value) {
	return value > 9 ? value : `0${value}`;
}

/**
 * Format an UTC offset from minutes to [+/-][HH][separator][mm]
 * @param {Number} offset UTC offset
 * @param {String} separator Separator between hours and minutes
 * @returns {String} Formatted UTC offset
 */
function formatUtcOffset(offset, separator) {
	const sign = offset >= 0 ? '+' : '-';

	const absoluteOffset = Math.abs(offset);
	const min = absoluteOffset % 60;
	const hours = (absoluteOffset - min) / 60;

	return `${sign}${padTwoDigits(hours)}${separator}${padTwoDigits(min)}`;
}

export function getZones(lang) {
	// Determine which translation set to use.
	const url = getCdnUrl({name: 'cldr-dates-full', version: '39.0.0', path: `/main/${lang}/timeZoneNames.json`});
	return fetch(url)
		.then(response => {
			if (response.status >= 300) {
				throw new Error('getZones error');
			}
			return response.json();
		})
		.then(data => {
			return data.main[lang].dates.timeZoneNames.zone;
		});
}

/**
 * Get the sorted list of timezones in a given language.
 * Sort is done by UTC offset first, then by timezone name.
 * @param {String} lang
 * @returns {Array}
 */
export function getTimezones(lang, valueType = 'string') {
	return getZones(lang).then(zones => {
		/**
		 * Build timezone info object
		 * @param {String} timezone
		 * @returns {Object}
		 */
		const getTimezoneInfo = timezone => {
			const timezoneName = get(zones, `${timezone.replaceAll('/', '.')}.exemplarCity`, timezone);
			const offset = getTimezoneUTCOffset(timezone);
			const name = `(${formatUtcOffset(offset, ':')}) ${timezoneName}`;

			const timezoneInfo = {
				timezone,
				name, // "name" key is used by Typehead as search field
				title: name, // "name" key is used by Typehead as search field
				timezoneName,
				offset,
			};

			return {
				...timezoneInfo,
				// Format timezone value depending on the expected value format
				value: valueType === 'string' ? timezone : timezoneInfo,
			};
		};

		return (
			Object.keys(zones)
				.reduce((collectedTimezones, region) => {
					if (region === 'Etc') {
						// Skip "Etc" region
						return collectedTimezones;
					}

					const newTimezones = [];

					Object.keys(zones[region]).forEach(city => {
						if (
							'exemplarCity' in zones[region][city] ||
							city === 'Honolulu' // Honolulu contains subkeys but they are deprecated in IANA references ("HST"/"HDT")
						) {
							// Ex: Europe/Paris, Asia/Yerevan ...
							const timezone = `${region}/${city}`;
							newTimezones.push(getTimezoneInfo(timezone));
						} else {
							// Ex: America/Argentina/Buenos_Aires ...
							Object.keys(zones[region][city]).forEach(city2 => {
								const timezone = `${region}/${city}/${city2}`;
								newTimezones.push(getTimezoneInfo(timezone));
							});
						}
					});

					return [...collectedTimezones, ...newTimezones];
				}, [])
				// Sort by UTC offset, then by name
				.sort((a, b) => {
					return a.offset !== b.offset
						? a.offset - b.offset
						: a.timezoneName.localeCompare(b.timezoneName);
				})
		);
	});
}
