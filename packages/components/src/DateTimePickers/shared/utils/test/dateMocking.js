let OriginalDate;

export function mockDate(mockingDate) {
	if (OriginalDate === undefined) {
		OriginalDate = Date;
	}

	global.Date = function DateConstructor(...args) {
		if (args.length === 0) {
			return mockingDate;
		}
		return new OriginalDate(...args);
	};

	Object.getOwnPropertyNames(OriginalDate)
		.filter(key => !['name', 'length'].includes(key))
		.map(key => [key, OriginalDate[key]])
		.forEach(([key, value]) => {
			Date[key] = value;
		});

	global.Date.now = function DateNow() {
		return mockingDate.getTime();
	};
}

export function restoreDate() {
	global.Date = OriginalDate;
	OriginalDate = undefined;
}
