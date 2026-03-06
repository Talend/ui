import { Map, List } from 'immutable';

function immutableMapPropType(props, propName, componentName) {
	if (props[propName] != null && !Map.isMap(props[propName])) {
		return new Error(
			`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected an Immutable.Map.`,
		);
	}
	return null;
}

function immutableListPropType(props, propName, componentName) {
	if (props[propName] != null && !List.isList(props[propName])) {
		return new Error(
			`Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected an Immutable.List.`,
		);
	}
	return null;
}

function makeRequired(validator) {
	return function isRequired(props, propName, componentName) {
		if (props[propName] == null) {
			return new Error(
				`The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\`.`,
			);
		}
		return validator(props, propName, componentName);
	};
}

immutableMapPropType.isRequired = makeRequired(immutableMapPropType);
immutableListPropType.isRequired = makeRequired(immutableListPropType);

export { immutableMapPropType, immutableListPropType };
