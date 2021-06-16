const NATIVE_PROPS = [
	'autoFocus',
	'className',
	'form',
	'id',
	'name',
	'rel',
	'role',
	'tabIndex',
	'target',
	'title',
];
const NATIVE_PROPS_GROUPS = ['aria-', 'data-'];

function extractComponentProps(Component, props) {
	if (!Component) {
		return {};
	}
	const extractedProps = {};
	Object.keys(Component.propTypes || {}).forEach(propName => {
		if (props[propName] !== undefined) {
			extractedProps[propName] = props[propName];
		}
	});
	return extractedProps;
}

function extractNativeProps(props) {
	const extractedProps = {};
	Object.keys(props).forEach(propName => {
		if (
			NATIVE_PROPS.some(nativeProp => propName === nativeProp) ||
			NATIVE_PROPS_GROUPS.some(nativeProp => propName.startsWith(nativeProp))
		) {
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
