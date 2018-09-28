let OriginalDate;
let currentMockingDate;

const METHODS_SUFFIX__OVERRIDE_TO_UTC = [
	'Date',
	'FullYear',
	'Hours',
	'Milliseconds',
	'Minutes',
	'Month',
	'Seconds',
	'Day',
];

function overrideStaticMethods(BaseDate, OverridenDate) {
	Object.getOwnPropertyNames(BaseDate)
		.filter(key => key !== 'name')
		.filter(key => key !== 'length')
		.forEach(key => {
			// eslint-disable-next-line no-param-reassign
			OverridenDate[key] = BaseDate[key];
		});
}

function overridePrototypesMethods(NewDate) {
	const allMethods = Object.getOwnPropertyNames(NewDate.prototype);

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
		.filter(infos => infos !== undefined && METHODS_SUFFIX__OVERRIDE_TO_UTC.includes(infos.suffix))
		.forEach(({ prefix, suffix }) => {
			const defaultMethod = `${prefix}${suffix}`;
			const utcMethod = `${prefix}UTC${suffix}`;

			// eslint-disable-next-line no-param-reassign
			NewDate.prototype[defaultMethod] = NewDate.prototype[utcMethod];
		});
}

export function mockDate(mockingDate = new Date(0)) {
	currentMockingDate = mockingDate;
	const alreadyMocked = OriginalDate !== undefined;
	if (alreadyMocked) {
		return;
	}

	OriginalDate = Date;

	global.Date = function DateConstructor(...args) {
		if (args.length === 0) {
			return currentMockingDate;
		}

		const finalArgs = args.length >= 2 ? [Date.UTC(...args)] : args;

		return new OriginalDate(...finalArgs);
	};

	overrideStaticMethods(OriginalDate, Date);

	overridePrototypesMethods(Date);

	global.Date.now = function DateNow() {
		return currentMockingDate.getTime();
	};
}

export function restoreDate() {
	global.Date = OriginalDate;
	OriginalDate = undefined;
}
