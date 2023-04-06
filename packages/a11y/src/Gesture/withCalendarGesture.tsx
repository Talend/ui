/* eslint-disable react/no-multi-comp,class-methods-use-this */
import { ComponentType, Component, createRef, KeyboardEvent } from 'react';
import keycode from 'keycode';
import { focusOnDay, focusWithinCurrentCalendar } from './focus';
import { FIRST, LAST } from './constants';
import { WithCalendarGestureInjectedProps } from './propTypes';

/**
 * Switch month and focus on the same focused day or the month's limits if it's out of the limits
 */
function switchMonth(
	calendarRef: HTMLElement,
	indexToFocus: number,
	monthSwitcher: (cb?: () => void) => void,
) {
	monthSwitcher(() => {
		focusWithinCurrentCalendar(calendarRef, indexToFocus);
	});
}

// T is the type of data
// P is the props of the wrapped component that is inferred
// C is the actual interface of the wrapped component (used to grab defaultProps from it)

export function withCalendarGesture<P extends WithCalendarGestureInjectedProps>(
	WrappedComponent: ComponentType<P>,
) {
	// the magic is here: JSX.LibraryManagedAttributes will take the type of WrapedComponent and resolve its default props
	// against the props of WithData, which is just the original P type with 'data' removed from its requirements
	type Props = Omit<WithCalendarGestureInjectedProps, 'onKeyDown'>;

	return class CalendarGesture extends Component<Props> {
		static displayName = `CalendarGesture(${WrappedComponent.displayName})`;

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

		onKeyDown(event: KeyboardEvent<HTMLInputElement>, calendarRef: HTMLElement, dayIndex: number) {
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

		preventScroll = (evt: KeyboardEvent) => {
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
			return (
				<div ref={this.ref}>
					<WrappedComponent {...(this.props as any)} onKeyDown={this.onKeyDown} />
				</div>
			);
		}
	};
}
