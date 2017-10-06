import { api } from '@talend/react-cmf';

/**
 * add support for expression in actions.
 * it change the action props by their expression value
 * it support the following props in the action
 * * available
 * * disabled
 * * inProgress
 * * labelExpression
 */
function evalExpressions(action, context, payload = {}) {
	const newAction = api.expression.getProps(
		action,
		['active', 'available', 'disabled', 'inProgress'],
		context,
		payload,
	);
	if (action.labelExpression) {
		delete newAction.labelExpression;
		newAction.label = api.expression.call(action.labelExpression, context, newAction);
	}
	return newAction;
}

function getActionsPropsRecursive(context, ids, model, props) {
	const infos = ids.map(id => {
		if (typeof id === 'string') {
			return api.action.getActionInfo(context, id);
		}
		return id;
	});
	const dispatch = context.store.dispatch;
	const getActionObj = api.action.getActionObject;
	const actionsProps = infos.map(info =>
		Object.assign(
			{
				onClick(event, data) {
					if (info.actionCreator) {
						dispatch(getActionObj(context, info.id, event, data));
					} else {
						dispatch(Object.assign({ model }, info.payload));
					}
				},
			},
			evalExpressions(info, context, { model }),
		),
	);
	actionsProps.forEach((action, index) => {
		if (action.items && Array.isArray(action.items)) {
			const ret = action.items.map(item => {
				let id = [];
				if (typeof item.id === 'string') {
					id = [item.id];
				}
				return getActionsPropsRecursive(context, id, model, action.items);
			});
			const test = ret.reduce((a, b) => [...a, ...b], []);
			actionsProps[index].items = test;
		}
	});
	return actionsProps;
}
// }

export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}
	let tmpIds = ids;
	const onlyOne = typeof ids === 'string' || (typeof ids === 'object' && !Array.isArray(ids));
	if (onlyOne) {
		tmpIds = [ids];
	}
	const actionsProps = getActionsPropsRecursive(context, tmpIds, model, []);
	if (onlyOne) {
		return actionsProps[0];
	}
	return actionsProps;
}

export default {
	getProps: getActionsProps,
	evalExpressions,
};
