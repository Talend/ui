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
	if (action.iconExpression) {
		delete newAction.iconExpression;
		newAction.icon = api.expression.call(action.iconExpression, context, newAction);
	}
	if (action.itemsExpression) {
		delete newAction.itemsExpression;
		newAction.items = api.expression.call(action.itemsExpression, context, newAction);
	}
	return newAction;
}

function getActionById(id, context) {
	if (typeof id === 'string') {
		return api.action.getActionInfo(context, id);
	}
	return id;
}

function getOnClick(action, context, model) {
	return {
		...action,
		onClick(event, data) {
			if (action.actionCreator) {
				context.store.dispatch(api.action.getActionObject(context, action.id, event, data));
			} else {
				context.store.dispatch(
					Object.assign(
						{
							model,
						},
						action.payload,
					),
				);
			}
		},
	};
}

function buidAction(action, context, model) {
	// prettier-ignore
	return getItems(
		getOnClick(
			evalExpressions(
				getActionById(action, context),
				context, { model }
			),
			context, model),
		context,
	);
}

function getItems(action, context) {
	if (action.items) {
		return {
			...action,
			items: action.items.map(info => buidAction(info, context)),
		};
	}
	return action;
}

export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}
	let tmpIds = ids;
	const onlyOne = typeof ids === 'string' || (typeof ids === 'object' && !Array.isArray(ids));
	if (onlyOne) {
		tmpIds = [ids];
	}

	const props = tmpIds.map(id => buidAction(id, context, model));

	if (onlyOne) {
		return props[0];
	}

	return props;
}

export default {
	getProps: getActionsProps,
	evalExpressions,
};
