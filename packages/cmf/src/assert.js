export function assertValueTypeOf(value, type) {
	if (value === undefined) {
		return true;
	}
	if (type === 'Array' && Array.isArray(value)) {
		return true;
	}
	if (Array.isArray(type)) {
		return type.some(currentType => assertValueTypeOf(value, currentType));
	}
	// eslint-disable-next-line valid-typeof
	return typeof value === type && !Array.isArray(value);
}

export function assertTypeOf(options, attr, type, toThrow = true) {
	const isTypeCorrect = assertValueTypeOf(options[attr], type);
	if (toThrow && isTypeCorrect === false) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
	return isTypeCorrect;
}
