// Local copy of immutableListPropType — components does not depend on @talend/react-cmf.
// Canonical version: packages/cmf/src/propTypes/immutable.js
// TODO: consider moving these validators to @talend/utils to avoid duplication.
import { List } from 'immutable';

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

immutableListPropType.isRequired = makeRequired(immutableListPropType);

export { immutableListPropType };
