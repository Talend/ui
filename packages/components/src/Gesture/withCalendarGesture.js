import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import omit from 'lodash/omit';

function focusOn(element) {
	if (element) {
		element.focus();
	}
}

function getAllDays(calendarRef) {
	return calendarRef.querySelectorAll('td > button');
}

function getDay(calendarRef, offset) {
	const allDays = getAllDays(calendarRef);
	const index = offset >= 0 ? offset : allDays.length + offset;
	return allDays[index];
}

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
