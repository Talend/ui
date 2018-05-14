export function assertTypeOf(options, attr, type, toThrow = true) {
	let isTypeCorrect = true;
	if (Array.isArray(type)) {
		isTypeCorrect = type.reduce((acc, current) => {
			return assertTypeOf(options, attr, current, false) || acc;
		});
	} else if (type === 'Array' && options[attr] && !Array.isArray(options[attr])) {
		isTypeCorrect = false;
	} else if (
		// eslint-disable-next-line valid-typeof
		options[attr] &&
		typeof options[attr] !== type
	) {
		isTypeCorrect = false;
	}
	if (toThrow && !isTypeCorrect) {
		throw new Error(`${attr} must be a ${type} but got ${typeof options[attr]}`);
	}
	return isTypeCorrect;
}
