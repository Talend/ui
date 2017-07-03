import { api } from 'react-cmf';

/**
 * add support for expression in actions.
 * it change the action props by their expression value
 */
function evalExpressions(action, context, payload = {}) {
	const newAction = Object.assign({}, action, payload);
	const EXPRESSION_ATTRIBUTES = ['available', 'disabled'];
	EXPRESSION_ATTRIBUTES.forEach((attr) => {
		const value = action[attr];
		if (typeof value === 'string' || typeof value === 'object') {
			newAction[attr] = api.expression.call(value, context, newAction);
		}
	});
	return newAction;
}

export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}

	let tmpIds = ids;
	if (typeof ids === 'string') {
		tmpIds = [ids];
	}

	const infos = tmpIds.map(id => api.action.getActionInfo(context, id));
	const props = infos.map(info => Object.assign({
		onClick(event, data) {
			if (info.actionCreator) {
				context.store.dispatch(
					api.action.getActionObject(context, info.id, event, data)
				);
			} else {
				context.store.dispatch(Object.assign({
					model,
				}, info.payload));
			}
		},
	}, evalExpressions(info, context, { model })));

	if (typeof ids === 'string') {
		return props[0];
	}

	return props;
}

export default {
	getProps: getActionsProps,
	evalExpressions,
};
