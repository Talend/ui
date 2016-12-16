import { api } from 'react-cmf';

export function getActionProps(context, id) {
	const info = api.action.getActionInfo(context, id);
	info.onClick = (event, data) => {
		context.store.dispatch(
			api.action.getActionObject(context, a.id, event, data)
		);
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
			context.store.dispatch(
				api.action.getActionObject(context, a.id, event, data)
			);
		};
	});
	return infos;
}
