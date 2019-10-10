/* eslint-disable react/no-multi-comp,class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';

const FIRST = 0;
const LAST = Number.POSITIVE_INFINITY;

function focusOn(element) {
	if (element) {
		element.focus();
	}
}

/**
 * Select all items in current calendar
 */
function getAllItems(calendarRef) {
	return calendarRef.querySelectorAll('td > button[data-value]');
}

/**
 * Focus on the item within the current calendar.
 * If the day index is out of the calendar's limits, it focuses on the limits.
 */
function focusWithinCurrentCalendar(calendarRef, indexToFocus) {
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
 * Get the day corresponding to the offset.
 * - positive offset : we count from the beginning of the month. Ex : days 1-31 + offset 5  = day 5
 * - negative offset < 0 : we count from the end of the month. 	 Ex : days 1-31 + offset -2 = day 29
 */
function getDay(calendarRef, offset) {
	const allItems = getAllItems(calendarRef);
	const index = offset >= 0 ? offset : allItems.length + offset;
	return allItems[index];
}

/**
 * Focus on the day, managing the switch to previous/next month
 */
function focusOnDay(calendarRef, indexToFocus, { goToPreviousMonth, goToNextMonth }) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus < 0) {
		goToPreviousMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus));
		});
	} else if (indexToFocus > allItems.length - 1) {
		goToNextMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus - allItems.length));
		});
	} else {
		focusOn(allItems[indexToFocus]);
	}
}

/**
 * Switch month and focus on the same focused day or the month's limits if it's out of the limits
 */
function switchMonth(calendarRef, indexToFocus, monthSwitcher) {
	monthSwitcher(() => {
		focusOn(focusWithinCurrentCalendar(calendarRef, indexToFocus));
	});
}

/**
 * Focus management on calendar.
 * - try to focus on the selected item
 * - try to focus on the 1st not disabled item
 * - try to focus on the 1st item
 */
export function focusOnCalendar(containerRef) {
	let target = containerRef.querySelector('td[aria-current="date"] > button');
	if (!target) {
		target = containerRef.querySelector('td > button[disabled=false]');
	}
	if (!target) {
		target = containerRef.querySelector('td > button[data-value]');
	}
	if (target) {
		target.focus();
	}
}

export function withCalendarGesture(WrappedComponent) {
	class CalendarGesture extends React.Component {
		constructor(props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
			this.preventScroll = this.preventScroll.bind(this);
		}

		componentDidMount() {
			this.ref.addEventListener('keydown', this.preventScroll);
		}

		componentWillUnmount() {
			this.ref.removeEventListener('keydown', this.preventScroll);
		}

		onKeyDown(event, calendarRef, dayIndex) {
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

		preventScroll(event) {
			const arrows = [
				keycode.codes.left,
				keycode.codes.right,
				keycode.codes.up,
				keycode.codes.down,
				keycode.codes.home,
				keycode.codes['page up'],
				keycode.codes['page down'],
			];
			if (arrows.includes(event.keyCode)) {
				event.preventDefault();
			}
		}

		render() {
			return (
				<div
					ref={ref => {
						this.ref = ref;
					}}
				>
					<WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />
				</div>
			);
		}
	}

	CalendarGesture.propTypes = {
		...omit(WrappedComponent.propTypes, 'onKeyDown'),
		goToPreviousMonth: PropTypes.func.isRequired,
		goToNextMonth: PropTypes.func.isRequired,
	};
	CalendarGesture.displayName = `CalendarGesture(${WrappedComponent.displayName})`;

	return CalendarGesture;
}

export function withMonthCalendarGesture(WrappedComponent, rowSize) {
	class MonthCalendarGesture extends React.Component {
		constructor(props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
			this.preventScroll = this.preventScroll.bind(this);
		}

		componentDidMount() {
			this.ref.addEventListener('keydown', this.preventScroll);
		}

		componentWillUnmount() {
			this.ref.removeEventListener('keydown', this.preventScroll);
		}

		onKeyDown(event, calendarRef, monthIndex) {
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

		preventScroll(event) {
			const arrows = [
				keycode.codes.left,
				keycode.codes.right,
				keycode.codes.up,
				keycode.codes.down,
				keycode.codes.home,
				keycode.codes.end,
			];
			if (arrows.includes(event.keyCode)) {
				event.preventDefault();
			}
		}

		render() {
			return (
				<div
					ref={ref => {
						this.ref = ref;
					}}
				>
					<WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />
				</div>
			);
		}
	}

	MonthCalendarGesture.propTypes = {
		...omit(WrappedComponent.propTypes, 'onKeyDown'),
	};
	MonthCalendarGesture.displayName = `MonthCalendarGesture(${WrappedComponent.displayName})`;

	return MonthCalendarGesture;
}
