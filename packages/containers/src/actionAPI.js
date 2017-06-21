import { api } from 'react-cmf';

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
		model,
		onClick(event, data) {
			if (info.actionCreator) {
				context.store.dispatch(
					api.action.getActionObject(context, info.id, event, data)
				);
			} else {
				context.store.dispatch(Object.assign({
					model,
				}, info.payload, { event: { ctrlKey: event.ctrlKey, button: event.button } }));
			}
		},
	}, info));

	if (typeof ids === 'string') {
		return props[0];
	}

	return props;
}

export default {
	getProps: getActionsProps,
};
