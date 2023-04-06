/* eslint-disable react/no-multi-comp,class-methods-use-this */
import { ComponentType, createRef, Component, KeyboardEvent } from 'react';
import keycode from 'keycode';
import { focusWithinCurrentCalendar } from './focus';
import { FIRST, LAST } from './constants';
import { WithCalendarGestureInjectedProps } from './propTypes';

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
			event: KeyboardEvent<HTMLInputElement>,
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

		preventScroll(evt: KeyboardEvent) {
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
		}

		render() {
			return (
				<div ref={this.ref}>
					<WrappedComponent {...(this.props as any)} onKeyDown={this.onKeyDown} />
				</div>
			);
		}
	};
}
