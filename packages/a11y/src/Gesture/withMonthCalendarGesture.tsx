/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-multi-comp,class-methods-use-this */
import { ComponentType, createRef, Component, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { focusWithinCurrentCalendar } from './focus';
import { FIRST, LAST } from './constants';
import { WithCalendarGestureInjectedProps } from './propTypes';
import { preventScroll } from './preventScroll';

export function withMonthCalendarGesture<P extends WithCalendarGestureInjectedProps>(
	WrappedComponent: ComponentType<P>,
	rowSize: number,
) {
	type Props = Omit<WithCalendarGestureInjectedProps, 'onKeyDown'>;

	return class MonthCalendarGesture extends Component<Props> {
		static displayName = `MonthCalendarGesture(${WrappedComponent.displayName})`;

		ref = createRef<HTMLDivElement>();

		constructor(props: Props) {
			super(props);
			this.onKeyDown = this.onKeyDown.bind(this);
		}

		onKeyDown(
			event: ReactKeyboardEvent<HTMLInputElement>,
			calendarRef: HTMLElement,
			monthIndex: number,
		) {
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
			return (
				<div ref={this.ref} onKeyDown={preventScroll}>
					<WrappedComponent {...(this.props as any)} onKeyDown={this.onKeyDown} />
				</div>
			);
		}
	};
}
