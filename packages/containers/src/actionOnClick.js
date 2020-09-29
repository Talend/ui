import get from 'lodash/get';

export default function getOnClick(item, props) {
	if (item.href) {
		return {};
	}

	if (!item.actionCreator && !get(item, 'payload.type')) {
		return {};
	}

	return {
		onClick(event, data) {
			if (item.actionCreator) {
				props.dispatchActionCreator(item.actionCreator, event, data);
			} else {
				props.dispatch({
					model: props.model,
					...item.payload,
				});
			}
		},
	};
}
