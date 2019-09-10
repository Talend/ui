export function assertValueTypeOf(value, type, toThrow = true) {
	if (value === undefined) {
		return true;
	}
	if (type === 'Array' && Array.isArray(value)) {
		return true;
	}
	let isTypeCorrect;
	if (Array.isArray(type)) {
		isTypeCorrect = type.some(currentType => assertValueTypeOf(value, currentType, false));
	} else {
		// eslint-disable-next-line valid-typeof
		isTypeCorrect = typeof value === type && !Array.isArray(value);
	}
	if (toThrow && isTypeCorrect === false) {
		throw new Error(`${value} must be a ${type} but got ${typeof value}`);
	}
	return isTypeCorrect;
}

export function assertTypeOf(options, attr, type) {
	const isTypeCorrect = assertValueTypeOf(options[attr], type, false);
	if (isTypeCorrect === false) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
	return isTypeCorrect;
}
