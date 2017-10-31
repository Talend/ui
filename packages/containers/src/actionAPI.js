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
	return newAction;
}

/**
 * Return the onClick fonction for the given info action.
 * @param {object} info
 * @param {object} context
 * @param {object} model
 */
function getOnClickActions(info, context, model) {
	const dispatch = context.store.dispatch;
	const getActionObj = api.action.getActionObject;
	return function onClick(event, data) {
		if (info.actionCreator) {
			dispatch(getActionObj(context, info.id, event, data));
		} else {
			dispatch(Object.assign({ model }, info.payload));
		}
	};
}

/**
 * Look recursively in the action and return the settings, onClick and expression.
 * @param {object} context
 * @param {*} ids
 * @param {object} model
 */
function getActionsPropsRecursive(context, ids, model) {
	const infos = ids.map((id) => {
		if (typeof id === 'string') {
			return api.action.getActionInfo(context, id);
		}
		return id;
	});
	const actionsProps = infos.map(info =>
		Object.assign(
			{ onClick: getOnClickActions(info, context, model) },
			evalExpressions(info, context, { model }),
		),
	);
	actionsProps.forEach((action, index) => {
		if (action.items && Array.isArray(action.items)) {
			const ret = action.items
				.map((item) => {
					const id = typeof item.id === 'string' ? [item.id] : item.id;
					return getActionsPropsRecursive(context, id, model, action.items);
				})
				.reduce((a, b) => [...a, ...b], []);
			actionsProps[index].items = ret;
		}
	});
	return actionsProps;
}

/**
 * Return the action settings from the registry.
 * @param {object} context
 * @param {*} ids
 * @param {object} model
 */
export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}
	let tmpIds = ids;
	const onlyOne = typeof ids === 'string' || (typeof ids === 'object' && !Array.isArray(ids));
	if (onlyOne) {
		tmpIds = [ids];
	}

  const actionsProps = getActionsPropsRecursive(context, tmpIds, model);

	if (onlyOne) {
		return actionsProps[0];
	}
	return actionsProps;
}

export default {
	getProps: getActionsProps,
	evalExpressions,
};
