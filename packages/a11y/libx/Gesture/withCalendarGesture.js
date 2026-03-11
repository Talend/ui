import { jsx } from 'react/jsx-runtime';
import { Component, createRef } from 'react';
import { FIRST, LAST } from './constants';
import { focusOnDay, focusWithinCurrentCalendar } from './focus';
import { preventScroll } from './preventScroll';
function switchMonth(calendarRef, indexToFocus, monthSwitcher) {
	monthSwitcher(() => {
		focusWithinCurrentCalendar(calendarRef, indexToFocus);
	});
}
function withCalendarGesture(WrappedComponent) {
	var _a;
	return (
		(_a = class extends Component {
			constructor(props) {
				super(props);
				this.ref = createRef();
				this.onKeyDown = this.onKeyDown.bind(this);
			}
			onKeyDown(event, calendarRef, dayIndex) {
				switch (event.key) {
					case 'Left':
					case 'ArrowLeft':
						event.stopPropagation();
						focusOnDay(calendarRef, dayIndex - 1, this.props);
						break;
					case 'Right':
					case 'ArrowRight':
						event.stopPropagation();
						focusOnDay(calendarRef, dayIndex + 1, this.props);
						break;
					case 'Up':
					case 'ArrowUp':
						event.stopPropagation();
						focusOnDay(calendarRef, dayIndex - 7, this.props);
						break;
					case 'Down':
					case 'ArrowDown':
						event.stopPropagation();
						focusOnDay(calendarRef, dayIndex + 7, this.props);
						break;
					case 'Home':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, FIRST);
						break;
					case 'End':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, LAST);
						break;
					case 'PageUp':
						event.stopPropagation();
						switchMonth(calendarRef, dayIndex, this.props.goToPreviousMonth);
						break;
					case 'PageDown':
						event.stopPropagation();
						switchMonth(calendarRef, dayIndex, this.props.goToNextMonth);
						break;
					default:
						break;
				}
			}
			render() {
				return /* @__PURE__ */ jsx('div', {
					ref: this.ref,
					onKeyDown: preventScroll,
					children: /* @__PURE__ */ jsx(WrappedComponent, {
						...this.props,
						onKeyDown: this.onKeyDown,
					}),
				});
			}
		}),
		(_a.displayName = `CalendarGesture(${WrappedComponent.displayName})`),
		_a
	);
}
export { withCalendarGesture };
//# sourceMappingURL=withCalendarGesture.js.map
