export default function getValue(value, strategy) {
	if (!strategy) {
		return value;
	}
	switch (strategy) {
		case 'length':
			if (value && Array.isArray(value)) {
				return value.length;
			}
			return 0;
		default:
			return false;
	}
}
