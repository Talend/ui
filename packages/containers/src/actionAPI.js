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
	infos.forEach((info) => {
		info.model = model; // eslint-disable-line no-param-reassign
		info.onClick = (event, data) => { // eslint-disable-line no-param-reassign
			if (info.actionCreator) {
				context.store.dispatch(
					api.action.getActionObject(context, info.id, event, data)
				);
			} else {
				context.store.dispatch(Object.assign({
					model: info.model,
				}, info.payload));
			}
		};
	});
	return infos;
}

export default {
	getProps: getActionsProps,
};
