import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import getRenderers from '../renderers';

const renderers = {
	ActionButton,
	ActionFile,
	ActionSplitDropdown,
	ActionDropdown,
};

const DEPRECATED_EXPRESSION = ['active', 'available', 'disabled', 'inProgress'];

const warned = {};

function updateExpression(props) {
	const newProps = Object.assign({}, props);
	DEPRECATED_EXPRESSION.forEach((key) => {
		if (typeof props[key] === 'string' || typeof props[key] === 'object') {
			if (!warned[key]) {
				warned[key] = true;
				console.warn(`Warning: please use ${key}Expression props instead
				to compute ${props.actionId} expression`);
			}
			newProps[`${key}Expression`] = props[key];
		}
	});
	return newProps;
}

export function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId && !ownProps.name) {
		return {};
	}
	let props = api.action.getActionInfo({
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	}, ownProps.actionId || ownProps.name);
	props = updateExpression(props);
	props.renderers = getRenderers(renderers);
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	DEPRECATED_EXPRESSION.forEach((key) => {
		if (typeof props[key] === 'string' || typeof props[key] === 'object') {
			delete props[key];
		}
	});
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(Action);
