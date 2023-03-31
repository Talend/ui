import { FIRST, LAST } from './constants';
import { CalendarGestureProps } from './propTypes';

export interface WithFocus {
	focus: HTMLElement['focus'];
}

export function focusOn(element?: WithFocus | null) {
	if (element) {
		element.focus();
	}
}

/**
 * Select all items in current calendar
 */
function getAllItems(calendarRef: HTMLElement) {
	return calendarRef.querySelectorAll<HTMLButtonElement>('td > button[data-value]');
}

/**
 * Get the day corresponding to the offset.
 * - positive offset : we count from the beginning of the month. Ex : days 1-31 + offset 5  = day 5
 * - negative offset < 0 : we count from the end of the month. 	 Ex : days 1-31 + offset -2 = day 29
 */
function getDay(calendarRef: HTMLElement, offset: number): HTMLElement {
	const allItems = getAllItems(calendarRef);
	const index = offset >= 0 ? offset : allItems.length + offset;
	return allItems[index];
}

/**
 * Focus on the item within the current calendar.
 * If the day index is out of the calendar's limits, it focuses on the limits.
 */
export function focusWithinCurrentCalendar(calendarRef: HTMLElement, indexToFocus = 0) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus === FIRST || indexToFocus < 0) {
		focusOn(allItems[0]);
	} else if (indexToFocus === LAST || indexToFocus > allItems.length - 1) {
		focusOn(allItems[allItems.length - 1]);
	} else {
		focusOn(allItems[indexToFocus]);
	}
}

/**
 * Focus on the day, managing the switch to previous/next month
 */
export function focusOnDay(
	calendarRef: HTMLElement,
	indexToFocus: number,
	props: CalendarGestureProps,
) {
	const allItems = getAllItems(calendarRef);

	if (indexToFocus < 0) {
		props.goToPreviousMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus));
		});
	} else if (indexToFocus > allItems.length - 1) {
		props.goToNextMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus - allItems.length));
		});
	} else {
		focusOn(allItems[indexToFocus] as HTMLElement);
	}
}

/**
 * Focus management on calendar.
 * - try to focus on the selected item
 * - try to focus on the 1st not disabled item
 * - try to focus on the 1st item
 */
export function focusOnCalendar(containerRef: HTMLElement) {
	let target = containerRef.querySelector<HTMLElement>('td[aria-current="date"] > button');
	if (!target) {
		target = containerRef.querySelector<HTMLElement>('td > button[disabled=false]');
	}
	if (!target) {
		target = containerRef.querySelector<HTMLElement>('td > button[data-value]');
	}
	if (target) {
		target.focus();
	}
}
