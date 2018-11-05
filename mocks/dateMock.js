let OriginalDate;

/**
 * Unmock the Date object by restoring the native Date
 */
function restore() {
	if (OriginalDate) {
		global.Date = OriginalDate;
		OriginalDate = undefined;
	}
}

function mock(now) {
	OriginalDate = global.Date;
	global.Date = () => now;
	global.Date.now = () => now;
}

export default {
	mock,
	restore,
};
