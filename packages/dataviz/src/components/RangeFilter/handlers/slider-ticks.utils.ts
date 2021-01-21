import { scaleTime } from 'd3';
import { Range } from '../../../types';
import { Ticks } from './range-handler.types';

export function formatD3Ticks(
	limits: Range,
	scale: number[],
	formatter: (value: number) => string,
): Ticks {
	// D3 returns an array "of approximately count + 1 uniformly-spaced, nicely-rounded values between start and stop"
	// It's nice, but we want to make sure we'll always show min and max values
	const ticks: Ticks = {};
	// Add min/max and remove duplicates, then create a map [value, label to display]
	[limits.min, ...scale, limits.max].forEach(value => {
		const label = formatter(value);
		if (!Object.values(ticks).includes(label)) {
			ticks[value] = label;
		}
	});
	return ticks;
}

export function formatTimeTicks(limits: Range, formatter: (v: number) => string) {
	return formatD3Ticks(
		limits,
		scaleTime()
			.domain([limits.min, limits.max])
			.ticks(3)
			.map(v => v.getTime()),
		formatter,
	);
}
