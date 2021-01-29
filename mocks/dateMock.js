let spy;

/**
 * Unmock the Date object by restoring the native Date
 */
function restore() {
	if (spy) {
		spy.mockRestore();
		spy = undefined;
	}
}

function mock(now) {
	if (spy) {
		restore();
	}
	spy = jest.spyOn(global, 'Date').mockImplementation(() => now);
	global.Date.now = jest.fn(() => now);
}

export default {
	mock,
	restore,
};
