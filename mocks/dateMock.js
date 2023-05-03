/**
 * Unmock the Date object by restoring the native Date
 */
function restore() {
	jest.useRealTimers();
}

function mock(now) {
	jest.useFakeTimers().setSystemTime(now);
}

export default {
	mock,
	restore,
};
