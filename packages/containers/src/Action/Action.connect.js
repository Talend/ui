import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';
import getRenderers from '../renderers';

const OLD_EXPRESSION = ['active', 'available', 'disabled', 'inProgress'];

function updateExpression(props) {
	const newProps = Object.assign({}, props);
	OLD_EXPRESSION.forEach((key) => {
		if (typeof props[key] === 'string' || typeof props[key] === 'object') {
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
	props.renderers = getRenderers();
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	OLD_EXPRESSION.forEach((key) => {
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
