// eslint-disable-next-line import/prefer-default-export
export function assertTypeOf(options, attr, type, toThrow = true) {
	let isTypeCorrect = true;
	if (Array.isArray(type)) {
		isTypeCorrect = type.reduce(
			(acc, current) => assertTypeOf(options, attr, current, false) || acc,
		);
	} else if (type === 'Array' && options[attr] && !Array.isArray(options[attr])) {
		isTypeCorrect = false;
	} else if (
		options[attr] &&
		// eslint-disable-next-line valid-typeof
		typeof options[attr] !== type
	) {
		isTypeCorrect = false;
	}
	if (toThrow && !isTypeCorrect) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
	return isTypeCorrect;
}
