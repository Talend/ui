let OriginalDate;

const SET_METHODS_OVERRIDE_TO_UTC = [
	'Date',
	'FullYear',
	'Hours',
	'Milliseconds',
	'Minutes',
	'Month',
	'Seconds',
];
const GET_METHODS_OVERRIDE_TO_UTC = SET_METHODS_OVERRIDE_TO_UTC.concat('Day');

function overridePrototypesMethods(NewDate) {
	function overrideLocalToUtc(allMethods, methodsToOverride) {
		allMethods
			.map(method => {
				const matches = method.match(/^(get|set)(?:UTC?)(.+)$/);

				if (matches === null) {
					return undefined;
				}

				const [, prefix, suffix] = matches;

				return {
					prefix,
					suffix,
				};
			})
			.filter(infos => infos !== undefined && methodsToOverride.includes(infos.suffix))
			.forEach(({ prefix, suffix }) => {
				const defaultMethod = `${prefix}${suffix}`;
				const utcMethod = `${prefix}UTC${suffix}`;

				// eslint-disable-next-line no-param-reassign
				NewDate.prototype[defaultMethod] = NewDate.prototype[utcMethod];
			});
	}
	const allMethods = Object.getOwnPropertyNames(NewDate.prototype);
	const methodsToOverride = [...GET_METHODS_OVERRIDE_TO_UTC, ...SET_METHODS_OVERRIDE_TO_UTC];
	overrideLocalToUtc(allMethods, methodsToOverride);
}

export function mockDate(mockingDate = new Date(0)) {
	if (OriginalDate === undefined) {
		OriginalDate = Date;
	}

	global.Date = function DateConstructor(...args) {
		if (args.length === 0) {
			return mockingDate;
		}

		const finalArgs = args.length >= 2 ? [Date.UTC(...args)] : args;

		return new OriginalDate(...finalArgs);
	};

	Object.getOwnPropertyNames(OriginalDate)
		.filter(key => !['name', 'length'].includes(key))
		.map(key => [key, OriginalDate[key]])
		.forEach(([key, value]) => {
			// eslint-disable-next-line no-param-reassign
			Date[key] = value;
		});

	overridePrototypesMethods(Date);

	global.Date.now = function DateNow() {
		return mockingDate.getTime();
	};
}

export function restoreDate() {
	global.Date = OriginalDate;
	OriginalDate = undefined;
}
