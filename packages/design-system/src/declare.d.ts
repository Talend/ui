declare module 'expect' {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	interface Matchers<R> {
		toHaveNoViolations(): R;
	}
}
