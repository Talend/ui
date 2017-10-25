const NATIVE_PROPS = [
	'aria-label',
	'autoFocus',
	'className',
	'id',
	'name',
	'target',
];

function extractComponentProps(Component, props) {
	if (!Component) {
		return {};
	}
	const extractedProps = {};
	Object.keys(Component.propTypes || {}).forEach((propName) => {
		if (props[propName] !== undefined) {
			extractedProps[propName] = props[propName];
		}
	});
	return extractedProps;
}

function extractNativeProps(props) {
	const extractedProps = {};
	NATIVE_PROPS.forEach((propName) => {
		if (props[propName] !== undefined) {
			extractedProps[propName] = props[propName];
		}
	});
	return extractedProps;
}

export default function getPropsFrom(Component, props) {
	if (!Component) {
		return {};
	}
	return {
		...extractNativeProps(props),
		...extractComponentProps(Component, props),
	};
}
