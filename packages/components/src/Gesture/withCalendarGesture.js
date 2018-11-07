import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';

const FIRST_DAY = 0;
const LAST_DAY = Number.POSITIVE_INFINITY;

function focusOn(element) {
	if (element) {
		element.focus();
	}
}

/**
 * Select all days elements
 */
function getAllDays(calendarRef) {
	return calendarRef.querySelectorAll('td > button');
}

/**
 * Get the day corresponding to the offset.
 * - positive offset : we count from the beginning of the month. Ex : days 1-31 + offset 5  = day 5
 * - negative offset < 0 : we count from the end of the month. 	 Ex : days 1-31 + offset -2 = day 29
 */
function getDay(calendarRef, offset) {
	const allDays = getAllDays(calendarRef);
	const index = offset >= 0 ? offset : allDays.length + offset;
	return allDays[index];
}

/**
 * Focus on the day, managing the switch to previous/next month
 */
function focusOnDay(calendarRef, indexToFocus, { goToPreviousMonth, goToNextMonth }) {
	const allDays = getAllDays(calendarRef);
	if (indexToFocus < 0) {
		goToPreviousMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus));
		});
	} else if (indexToFocus > allDays.length - 1) {
		goToNextMonth(() => {
			focusOn(getDay(calendarRef, indexToFocus - allDays.length));
		});
	} else {
		focusOn(allDays[indexToFocus]);
	}
}

/**
 * Focus on the day.
 * If the day index is out of the month's limits, it focuses on the month limits.
 */
function focusOnDayWithinMonth(calendarRef, indexToFocus) {
	const allDays = getAllDays(calendarRef);
	if (indexToFocus === FIRST_DAY || indexToFocus < 0) {
		focusOn(allDays[0]);
	} else if (indexToFocus === LAST_DAY || indexToFocus > allDays.length - 1) {
		focusOn(allDays[allDays.length - 1]);
	} else {
		focusOn(allDays[indexToFocus]);
	}
}

/**
 * Switch month and focus on the same focused day or the month's limits if it's out of the limits
 */
function switchMonth(calendarRef, indexToFocus, monthSwitcher) {
	monthSwitcher(() => {
		focusOn(focusOnDayWithinMonth(calendarRef, indexToFocus));
	});
}

export default function withCalendarGesture(WrappedComponent) {
	class CalendarGesture extends React.Component {
		constructor(props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
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
					focusOnDayWithinMonth(calendarRef, FIRST_DAY);
					break;
				case keycode.codes.end:
					event.stopPropagation();
					focusOnDayWithinMonth(calendarRef, LAST_DAY);
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

		render() {
			return <WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />;
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
