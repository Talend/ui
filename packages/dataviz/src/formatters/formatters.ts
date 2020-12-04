import { format } from 'date-fns';
import i18next from 'i18next';

// should use locale value
const DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Return the number of fraction digits
 */
export function getFractionDigits(num: number): number {
	const match = `${num}`.match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	// match[1] Number of digits right of decimal point.
	// match[2]	Scientific notation
	return Math.max(0, (match?.[1]?.length || 0) - (+(match?.[2] || 0)));
}

export function formatDate(value: number): string {
	return format(value, DATE_FORMAT);
}

export function formatNumber(value: number, precision?: number): string {
	return value > 1e10
		? value.toFixed(0)
		: value.toLocaleString(i18next.language, {
				maximumFractionDigits: precision,
		  });
}
