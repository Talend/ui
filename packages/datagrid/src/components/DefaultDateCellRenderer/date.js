// eslint-disable-next-line import/prefer-default-export
export function dateToString(value) {
	if (value === null) {
		return value;
	}

	try {
		return new Date(parseInt(value, 10)).toISOString();
	} catch (e) {
		return value;
	}
}
