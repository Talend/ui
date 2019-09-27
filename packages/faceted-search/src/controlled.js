const isDefined = arg => typeof arg !== 'undefined';

// eslint-disable-next-line import/prefer-default-export
export const controlled = (componentName, ...args) => {
	const isControlled = args.every(isDefined);
	if (!isControlled && args.some(isDefined)) {
		throw new Error(
			`You are trying to control the ${componentName} but not all value are defined, refer to the api doc`,
		);
	}
	return isControlled;
};
