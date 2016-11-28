const NATIVE_PROPS = [
	'className',
	'id',
];

function extractComponentProps(Component, props) {
	const extractedProps = {};
	Object.keys(Component.propTypes).forEach((propName) => {
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
	return {
		...extractNativeProps(props),
		...extractComponentProps(Component, props),
	};
}
