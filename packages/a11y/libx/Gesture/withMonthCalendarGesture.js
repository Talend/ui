import { jsx } from 'react/jsx-runtime';
import { Component, createRef } from 'react';
import { FIRST, LAST } from './constants';
import { focusWithinCurrentCalendar } from './focus';
import { preventScroll } from './preventScroll';
function withMonthCalendarGesture(WrappedComponent, rowSize) {
	var _a;
	return (
		(_a = class extends Component {
			constructor(props) {
				super(props);
				this.ref = createRef();
				this.onKeyDown = this.onKeyDown.bind(this);
			}
			onKeyDown(event, calendarRef, monthIndex) {
				switch (event.key) {
					case 'Left':
					case 'ArrowLeft':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, monthIndex - 1);
						break;
					case 'Right':
					case 'ArrowRight':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, monthIndex + 1);
						break;
					case 'Up':
					case 'ArrowUp':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, monthIndex - rowSize);
						break;
					case 'Down':
					case 'ArrowDown':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, monthIndex + rowSize);
						break;
					case 'Home':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, FIRST);
						break;
					case 'End':
						event.stopPropagation();
						focusWithinCurrentCalendar(calendarRef, LAST);
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
		(_a.displayName = `MonthCalendarGesture(${WrappedComponent.displayName})`),
		_a
	);
}
export { withMonthCalendarGesture };
//# sourceMappingURL=withMonthCalendarGesture.js.map
