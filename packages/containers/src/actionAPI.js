import { api } from 'react-cmf';

export function getActionsProps(context, ids, model) {
	if (!ids) {
		return [];
	}

	let tmpIds = ids;
	if (typeof ids === 'string') {
		tmpIds = [ids];
	}

	// in the case of ConfirmDialog, the component is loaded (and hidden) even when not
	// used at the beginning,
	// so ids (state.validateAction) is neither a string neither an array in this case
	// as it takes a default state of the container which is an object.
	if (!Array.isArray(tmpIds)) {
		return ids;
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
				}, info.payload));
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
