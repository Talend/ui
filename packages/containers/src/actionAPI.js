import { api } from '@talend/react-cmf';
import forIn from 'lodash/forIn';

const regexExpression = /(.*)Expression/g;

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
	forIn(action, (value, key) => {
		if (key.match(regexExpression)) {
			const newKey = key.slice(0, -10);
			newAction[newKey] = api.expression.call(action[key], context, newAction);
			delete newAction[key];
		}
	});
	return newAction;
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

	const infos = tmpIds.map(id => {
		if (typeof id === 'string') {
			return api.action.getActionInfo(context, id);
		}
		return id;
	});

	const props = infos.map(info =>
		Object.assign(
			{
				onClick(event, data) {
					if (info.actionCreator) {
						context.store.dispatch(api.action.getActionObject(context, info.id, event, data));
					} else {
						context.store.dispatch(
							Object.assign(
								{
									model,
								},
								info.payload,
							),
						);
					}
				},
			},
			evalExpressions(info, context, { model }),
		),
	);

	if (onlyOne) {
		return props[0];
	}

	return props;
}

export default {
	getProps: getActionsProps,
	evalExpressions,
};
