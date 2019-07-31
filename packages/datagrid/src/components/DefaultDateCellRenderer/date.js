// eslint-disable-next-line import/prefer-default-export
export function dateToString(value) {
	if (value === null) {
		return value;
	}

	try {
		return new Date(value).toISOString();
	} catch (e) {
		return value;
	}
}
