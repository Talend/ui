export interface WithCalendarGestureInjectedProps {
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, ref: any, item: any) => void;
}
export interface CalendarGestureProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	goToPreviousMonth: (cb?: () => void) => void;
	goToNextMonth: (cb?: () => void) => void;
}
