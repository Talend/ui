let OriginalDate;

export function mockDate(mockingDate) {
	if (OriginalDate === undefined) {
		OriginalDate = Date;
	}

	global.Date = jest.fn((...args) => {
		if (args.length === 0) {
			return mockingDate;
		}
		return new OriginalDate(...args);
	});
}


export function restoreDate() {
	global.Date = OriginalDate;
	OriginalDate = undefined;
}
