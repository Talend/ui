import get from 'lodash/get';
import talendUtils from '@talend/utils';

/**
 * Get the sorted list of timezones in a given language.
 * Sort is done by UTC offset first, then by timezone name.
 * @param {String} lang 
 * @returns {Array}
 */
export function getTimezones(lang, cldrTimezones) {
	const timezonesKey = lang in cldrTimezones ? lang : 'en';
	const zones = cldrTimezones[timezonesKey].main[timezonesKey].dates.timeZoneNames.zone;

	/**
	 * Build timezone info object
	 * @param {String} timezone
	 * @returns {Object}
	 */
	const getTimezoneInfo = timezone => {
		const timezoneName = get(zones, `${timezone.replaceAll('/', '.')}.exemplarCity`, timezone);
		const offset = talendUtils.date.getUTCOffset(timezone);
		const name = `(${talendUtils.date.formatReadableUTCOffset(offset)}) ${timezoneName}`;

		return { name, timezoneName, offset, value: timezone };
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
					city === 'Honolulu' // Honolulu contains sub-keys but they are deprecated in IANA references ("HST"/"HDT")
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
