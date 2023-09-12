/**
 * This allows Typescript to understand our array doesn't contain undefined or null values.
 * So result is typed without "| null" nor "| undefined".
 * This is not possible with a simple function like ".filter(v => !!v)" or ".filter(Boolean)"
 */
export const filterUndefinedOrNull = <T>(val: T | undefined | null): val is T =>
	val !== undefined && val !== null;
