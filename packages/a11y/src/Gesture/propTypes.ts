// The Wrapped component should have the following props
export type CalendarGestureProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	goToPreviousMonth: (cb?: () => void) => void;
	goToNextMonth: (cb?: () => void) => void;
};
// The HOC withCalendarGesture injects the following props
export type WithCalendarGestureInjectedProps = CalendarGestureProps & {
	onKeyDown: (
		e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
		ref: HTMLElement | null,
		dayIndex: number,
	) => void;
};
