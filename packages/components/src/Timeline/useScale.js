import { useMemo } from 'react';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';

const MILLISECONDS_IN_MINUTE = 60 * 1000;
const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;
const MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;

export const SCALE_MODES = {
	MINUTES: 'MINUTES',
	HOURS: 'HOURS',
};

const STEPS = {
	[SCALE_MODES.MINUTES]: MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.HOURS]: MILLISECONDS_IN_HOUR,
};

const UNIT_FORMATS = {
	[SCALE_MODES.MINUTES]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.HOURS]: { long: 'HH:mm', short: 'HH' },
};

function getIntervals(timeRange, step, locale, localFormats) {
	const [startTimestamp, endTimestamp] = timeRange;
	if (!startTimestamp || !endTimestamp) {
		return { days: [], hours: [] };
	}

	const timeUnits = new Array((endTimestamp - startTimestamp) / step).fill(0).map((_, index) => {
		const unitStartTimestamp = startTimestamp + index * step;
		const unitEndTimestamp = unitStartTimestamp + step;

		const startDate = new Date(unitStartTimestamp);
		const endDate = new Date(unitEndTimestamp);
		const isNewDate =
			index === 0 ||
			(startDate.getHours() === 0 && startDate.getMinutes() === 0 && startDate.getMinutes() === 0);

		const startLabels = {
			long: format(startDate, localFormats.long, locale),
			short: format(startDate, localFormats.short, locale),
		};
		const endLabels = {
			long: format(endDate, localFormats.long, locale),
			short: format(endDate, localFormats.short, locale),
		};

		return { start: unitStartTimestamp, end: unitEndTimestamp, startLabels, endLabels, isNewDate };
	});

	const days = timeUnits.reduce((accu, unitDefinition) => {
		const { start, isNewDate } = unitDefinition;
		if (isNewDate) {
			accu.push({ start, label: format(start, 'DD MMM YYYY', locale), count: 1 });
		} else {
			accu[accu.length - 1].count++;
		}
		return accu;
	}, []);

	return { days, timeUnits };
}

export default function useScale(timeRange) {
	const [startTimestamp, endTimestamp] = timeRange;
	const isAtLeastADay = endTimestamp - startTimestamp >= MILLISECONDS_IN_DAY;

	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);

	return useMemo(() => {
		const scaleMode = isAtLeastADay ? SCALE_MODES.HOURS : SCALE_MODES.MINUTES;
		const stepMs = STEPS[scaleMode];
		return {
			scaleMode,
			stepMs,
			intervals: getIntervals(timeRange, stepMs, locale, UNIT_FORMATS[scaleMode]),
		};
	}, [timeRange]);
}
