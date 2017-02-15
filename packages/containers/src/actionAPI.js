import { api } from 'react-cmf';

export function getActionProps(context, id) {
	const info = api.action.getActionInfo(context, id);
	info.onClick = (event, data) => {
		if (info.actionCreator) {
			context.store.dispatch(
				api.action.getActionObject(context, id, event, data)
			);
		} else {
			context.store.dispatch(Object.assign({
				model: info.model,
			}, info.payload));
		}
	};
	return info;
}

export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}
	const infos = ids.map(id => api.action.getActionInfo(context, id));
	infos.forEach((a) => {
		a.model = model; // eslint-disable-line no-param-reassign
		a.onClick = (event, data) => { // eslint-disable-line no-param-reassign
			if (a.actionCreator) {
				context.store.dispatch(
					api.action.getActionObject(context, a.id, event, data)
				);
			} else {
				context.store.dispatch(Object.assign({
					model: a.model,
				}, a.payload));
			}
		};
	});
	return infos;
}
