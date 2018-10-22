// eslint-disable-next-line import/prefer-default-export
export function assertTypeOf(options, attr, type, toThrow = true) {
	let isTypeCorrect;
	if (options[attr] === undefined) {
		return true;
	} else if (type === 'Array' && Array.isArray(options[attr])) {
		return true;
	} else if (Array.isArray(type)) {
		isTypeCorrect = type.some(currentType => assertTypeOf(options, attr, currentType, false));
	} else {
		// eslint-disable-next-line valid-typeof
		isTypeCorrect = typeof options[attr] === type && !Array.isArray(options[attr]);
	}
	if (toThrow && isTypeCorrect === false) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
	return isTypeCorrect;
}
