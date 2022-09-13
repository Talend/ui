/* eslint-disable react/no-multi-comp,class-methods-use-this */
import * as React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';
import { focusOn } from './focus';

const FIRST = 0;
const LAST = Number.POSITIVE_INFINITY;
interface CalendarGestureProps {
	goToPreviousMonth: (cb: () => void) => void;
	goToNextMonth: (cb: () => void) => void;
}

/**
 * Select all items in current calendar
 */
function getAllItems(calendarRef: HTMLElement) {
	return calendarRef.querySelectorAll<HTMLButtonElement>('td > button[data-value]');
}

/**
 * Focus on the item within the current calendar.
 * If the day index is out of the calendar's limits, it focuses on the limits.
 */
function focusWithinCurrentCalendar(calendarRef: HTMLElement, indexToFocus: number = 0) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus === FIRST || indexToFocus < 0) {
		focusOn(allItems[0] as HTMLElement);
	} else if (indexToFocus === LAST || indexToFocus > allItems.length - 1) {
		focusOn(allItems[allItems.length - 1] as HTMLElement);
	} else {
		focusOn(allItems[indexToFocus] as HTMLElement);
	}
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
 * Focus on the day, managing the switch to previous/next month
 */
function focusOnDay(
	calendarRef: HTMLElement,
	indexToFocus: number = 0,
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
 * Switch month and focus on the same focused day or the month's limits if it's out of the limits
 */
function switchMonth(
	calendarRef: HTMLElement,
	indexToFocus: number,
	monthSwitcher: (cb: () => void) => void,
) {
	monthSwitcher(() => {
		focusWithinCurrentCalendar(calendarRef, indexToFocus);
	});
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

export function withCalendarGesture<T extends CalendarGestureProps = CalendarGestureProps>(
	WrappedComponent: React.ComponentType<T>,
) {
	return class CalendarGesture extends React.Component<T> {
		static displayName = `CalendarGesture(${WrappedComponent.displayName})`;
		ref = React.createRef<HTMLDivElement>();
		constructor(props: T) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		componentDidMount() {
			if (this.ref.current) {
				this.ref.current.addEventListener('keydown', this.preventScroll);
			}
		}

		componentWillUnmount() {
			if (this.ref.current) {
				this.ref.current.removeEventListener('keydown', this.preventScroll);
			}
		}

		onKeyDown(
			event: React.KeyboardEvent<HTMLInputElement>,
			calendarRef: HTMLElement,
			dayIndex: number,
		) {
			switch (event.keyCode) {
				case keycode.codes.left:
					event.stopPropagation();
					focusOnDay(calendarRef, dayIndex - 1, this.props);
					break;
				case keycode.codes.right:
					event.stopPropagation();
					focusOnDay(calendarRef, dayIndex + 1, this.props);
					break;
				case keycode.codes.up:
					event.stopPropagation();
					focusOnDay(calendarRef, dayIndex - 7, this.props);
					break;
				case keycode.codes.down:
					event.stopPropagation();
					focusOnDay(calendarRef, dayIndex + 7, this.props);
					break;
				case keycode.codes.home:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, FIRST);
					break;
				case keycode.codes.end:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, LAST);
					break;
				case keycode.codes['page up']:
					event.stopPropagation();
					switchMonth(calendarRef, dayIndex, this.props.goToPreviousMonth);
					break;
				case keycode.codes['page down']:
					event.stopPropagation();
					switchMonth(calendarRef, dayIndex, this.props.goToNextMonth);
					break;
				default:
					break;
			}
		}

		preventScroll = (evt: React.KeyboardEvent) => {
			const arrows = [
				keycode.codes.left,
				keycode.codes.right,
				keycode.codes.up,
				keycode.codes.down,
				keycode.codes.home,
				keycode.codes['page up'],
				keycode.codes['page down'],
			];
			if (arrows.includes(evt.keyCode)) {
				evt.preventDefault();
			}
		};

		render() {
			const props = { ...(this.props as T) };
			props.onKeyDown = this.onKeyDown;
			return (
				<div ref={this.ref}>
					<WrappedComponent {...props} />
				</div>
			);
		}
	};
}

export function withMonthCalendarGesture<T extends CalendarGestureProps = CalendarGestureProps>(
	WrappedComponent: React.ComponentType<T>,
	rowSize: number,
) {
	return class MonthCalendarGesture extends React.Component<T> {
		static propTypes = {
			...omit(WrappedComponent.propTypes, 'onKeyDown'),
		};
		static displayName = `MonthCalendarGesture(${WrappedComponent.displayName})`;
		ref = React.createRef<HTMLDivElement>();

		constructor(props: T & CalendarGestureProps) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		componentDidMount() {
			if (this.ref.current) {
				this.ref.current.addEventListener('keydown', this.preventScroll);
			}
		}

		componentWillUnmount() {
			if (this.ref.current) {
				this.ref.current.removeEventListener('keydown', this.preventScroll);
			}
		}

		onKeyDown(
			event: React.KeyboardEvent<HTMLInputElement>,
			calendarRef: HTMLElement,
			monthIndex: number,
		) {
			switch (event.keyCode) {
				case keycode.codes.left:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, monthIndex - 1);
					break;
				case keycode.codes.right:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, monthIndex + 1);
					break;
				case keycode.codes.up:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, monthIndex - rowSize);
					break;
				case keycode.codes.down:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, monthIndex + rowSize);
					break;
				case keycode.codes.home:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, FIRST);
					break;
				case keycode.codes.end:
					event.stopPropagation();
					focusWithinCurrentCalendar(calendarRef, LAST);
					break;
				default:
					break;
			}
		}

		preventScroll = (evt: React.KeyboardEvent) => {
			const arrows = [
				keycode.codes.left,
				keycode.codes.right,
				keycode.codes.up,
				keycode.codes.down,
				keycode.codes.home,
				keycode.codes.end,
			];
			if (arrows.includes(evt.keyCode)) {
				evt.preventDefault();
			}
		};

		render() {
			const props = { ...(this.props as T) };
			props.onKeyDown = this.onKeyDown;
			return (
				<div ref={this.ref}>
					<WrappedComponent {...props} />
				</div>
			);
		}
	};
}
