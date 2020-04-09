import React, { useMemo } from 'react';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import getLocale from '../DateFnsLocale/locale';

const MILLISECONDS_IN_MINUTE = 60 * 1000;
const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;
const MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;
const MILLISECONDS_IN_3_DAYS = 3 * MILLISECONDS_IN_DAY;

export const SCALE_MODES = {
	// base 5min
	MINUTES: 'MINUTES',
	TWO_MINUTES: '2MINUTES',
	FIVE_MINUTES: '5MINUTES',
	TEN_MINUTES: '10MINUTES',

	// base hour
	QUARTER_HOUR: 'QUARTER_HOUR',
	HALF_HOUR: 'HALF_HOUR',
	HOURS: 'HOURS',
	TWO_HOURS: '2HOURS',
	THREE_HOURS: '3HOURS',

	// base 6h
	FOUR_HOURS: '4HOURS',
	SIX_HOURS: '6HOURS',
	TWELVE_HOURS: '12HOURS',
};

const BASE_MODES = [SCALE_MODES.FIVE_MINUTES, SCALE_MODES.HOURS];

const STEPS = {
	// base 5min
	[SCALE_MODES.MINUTES]: MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.TWO_MINUTES]: 2 * MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.FIVE_MINUTES]: 5 * MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.TEN_MINUTES]: 10 * MILLISECONDS_IN_MINUTE,

	// base 1h
	[SCALE_MODES.QUARTER_HOUR]: 15 * MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.HALF_HOUR]: 30 * MILLISECONDS_IN_MINUTE,
	[SCALE_MODES.HOURS]: MILLISECONDS_IN_HOUR,
	[SCALE_MODES.TWO_HOURS]: 2 * MILLISECONDS_IN_HOUR,
	[SCALE_MODES.THREE_HOURS]: 3 * MILLISECONDS_IN_HOUR,

	// base 6h
	[SCALE_MODES.FOUR_HOURS]: 4 * MILLISECONDS_IN_HOUR,
	[SCALE_MODES.SIX_HOURS]: 6 * MILLISECONDS_IN_HOUR,
	[SCALE_MODES.TWELVE_HOURS]: 12 * MILLISECONDS_IN_HOUR,
};

const FIVE_MINS_BASE_STEPS = [
	SCALE_MODES.MINUTES,
	SCALE_MODES.TWO_MINUTES,
	SCALE_MODES.FIVE_MINUTES,
	SCALE_MODES.TEN_MINUTES,
];
const HOUR_BASE_STEPS = [
	SCALE_MODES.QUARTER_HOUR,
	SCALE_MODES.HALF_HOUR,
	SCALE_MODES.HOURS,
	SCALE_MODES.TWO_HOURS,
	SCALE_MODES.THREE_HOURS,
];

const SIX_HOURS_BASE_STEPS = [
	SCALE_MODES.FOUR_HOURS,
	SCALE_MODES.SIX_HOURS,
	SCALE_MODES.TWELVE_HOURS,
];

const UNIT_FORMATS = {
	// base 5min
	[SCALE_MODES.MINUTES]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.TWO_MINUTES]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.FIVE_MINUTES]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.TEN_MINUTES]: { long: 'HH:mm', short: 'mm' },

	// base hour
	[SCALE_MODES.QUARTER_HOUR]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.HALF_HOUR]: { long: 'HH:mm', short: 'mm' },
	[SCALE_MODES.HOURS]: { long: 'HH:mm', short: 'HH' },
	[SCALE_MODES.TWO_HOURS]: { long: 'HH:mm', short: 'HH' },
	[SCALE_MODES.THREE_HOURS]: { long: 'HH:mm', short: 'HH' },

	// base 6h
	[SCALE_MODES.FOUR_HOURS]: { long: 'DD MMM', short: 'HH' },
	[SCALE_MODES.SIX_HOURS]: { long: 'DD MMM', short: 'HH' },
	[SCALE_MODES.TWELVE_HOURS]: { long: 'DD MMM', short: 'HH' },
};

export const SCALE_BASE_MULTIPLIERS = {
	// base 5min
	[SCALE_MODES.MINUTES]: 1 / 5,
	[SCALE_MODES.TWO_MINUTES]: 2 / 5,
	[SCALE_MODES.FIVE_MINUTES]: 1,
	[SCALE_MODES.TEN_MINUTES]: 2,

	// base 1h
	[SCALE_MODES.QUARTER_HOUR]: 1 / 4,
	[SCALE_MODES.HALF_HOUR]: 1 / 2,
	[SCALE_MODES.HOURS]: 1,
	[SCALE_MODES.TWO_HOURS]: 2,
	[SCALE_MODES.THREE_HOURS]: 3,

	// base 6h
	[SCALE_MODES.FOUR_HOURS]: 4 / 6,
	[SCALE_MODES.SIX_HOURS]: 1,
	[SCALE_MODES.TWELVE_HOURS]: 2,
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

function getScaleMode(timeRange, zoom) {
	const [startTimestamp, endTimestamp] = timeRange;
	const isAtLeast3Days = endTimestamp - startTimestamp >= MILLISECONDS_IN_3_DAYS;
	const isAtLeastADay = endTimestamp - startTimestamp >= MILLISECONDS_IN_DAY;

	// more than 3 days
	// base scale is 6hour
	if (isAtLeast3Days) {
		if (zoom < 0.7) {
			return SCALE_MODES.TWELVE_HOURS;
		}
		if (zoom < 1.5) {
			return SCALE_MODES.SIX_HOURS;
		}

		return SCALE_MODES.FOUR_HOURS;
	}

	// between 1 et 3 days
	// base scale is hour
	if (isAtLeastADay) {
		if (zoom < 0.5) {
			return SCALE_MODES.THREE_HOURS;
		}
		if (zoom < 1) {
			return SCALE_MODES.TWO_HOURS;
		}
		if (zoom < 1.7) {
			return SCALE_MODES.HOURS;
		}
		if (zoom < 2.5) {
			return SCALE_MODES.HALF_HOUR;
		}
		return SCALE_MODES.QUARTER_HOUR;
	}

	// less than a day
	// base scale is 5 minutes
	if (zoom < 1) {
		return SCALE_MODES.TEN_MINUTES;
	}
	if (zoom < 1.7) {
		return SCALE_MODES.FIVE_MINUTES;
	}
	if (zoom < 2.5) {
		return SCALE_MODES.TWO_MINUTES;
	}
	return SCALE_MODES.MINUTES;
}

function getTimeLabelFn(scaleMode, locale) {
	return function (timestamp) {
		const longLabel = format(timestamp, 'HH:mm', locale);

		const date = new Date(timestamp);
		if (
			(SIX_HOURS_BASE_STEPS.includes(scaleMode) && date.getHours() === 0) ||
			(HOUR_BASE_STEPS.includes(scaleMode) && date.getMinutes() === 0) ||
			(FIVE_MINS_BASE_STEPS.includes(scaleMode) && date.getMinutes() === 0)
		) {
			return longLabel;
		}

		return (
			<>
				<span className="sr-only">{longLabel}</span>
				<span style={{ fontSize: '0.8em', opacity: '0.8', marginTop: '-0.5rem' }} aria-hidden>
					{format(timestamp, UNIT_FORMATS[scaleMode].short, locale)}
				</span>
			</>
		);
	};
}

export default function useScale(timeRange, zoom) {
	const { t } = useTranslation();
	const locale = useMemo(() => ({ locale: getLocale(t) }), [t]);
	const scaleMode = getScaleMode(timeRange, zoom);

	return useMemo(() => {
		const stepMs = STEPS[scaleMode];
		return {
			scaleMode,
			stepMs,
			getTimeLabel: getTimeLabelFn(scaleMode, locale),
			intervals: getIntervals(timeRange, stepMs, locale, UNIT_FORMATS[scaleMode]),
		};
	}, [timeRange, scaleMode]);
}
