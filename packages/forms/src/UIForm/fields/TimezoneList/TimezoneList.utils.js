import get from 'lodash/get';
import frTimezones from 'cldr-dates-full/main/fr/timeZoneNames.json';
import enTimezones from 'cldr-dates-full/main/en/timeZoneNames.json';
import jaTimezones from 'cldr-dates-full/main/ja/timeZoneNames.json';
import deTimezones from 'cldr-dates-full/main/de/timeZoneNames.json';
import talendUtils from '@talend/utils';

const TIMEZONES = { fr: frTimezones, en: enTimezones, ja: jaTimezones, de: deTimezones };

/**
 * Get the sorted list of timezones in a given language.
 * Sort is done by UTC offset first, then by timezone name.
 * @param {String} lang 
 * @returns {Array}
 */
export function getTimezones(lang, valueType = 'string') {
	const timezonesKey = lang in TIMEZONES ? lang : 'en';
	const zones = TIMEZONES[timezonesKey].main[timezonesKey].dates.timeZoneNames.zone;

	/**
	 * Build timezone info object
	 * @param {String} timezone
	 * @returns {Object}
	 */
	const getTimezoneInfo = timezone => {
		const timezoneName = get(zones, `${timezone.replaceAll('/', '.')}.exemplarCity`, timezone);
		const offset = talendUtils.date.getUTCOffset(timezone);
		const name = `(${talendUtils.date.formatUTCOffset(offset, ':')}) ${timezoneName}`;

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

	return Object.keys(zones)
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
		});
};
