import { api, cmfConnect } from '@talend/react-cmf';
import { Actions } from '@talend/react-components';

function mapStateToProps(state, { actionIds, names, ...rest }) {
	let actions = null;
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (actionIds) {
		actions = actionIds.map(
			id => api.action.getActionInfo(context, id),
		);
	} else if (names) {
		actions = names.map(
			id => api.action.getActionInfo(context, id),
		);
	}
	return { actions };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	delete props.actionIds;
	delete props.names;
	props.actions.forEach((action) => {
		action.onClick = (event, payload) => {  // eslint-disable-line no-param-reassign
			if (action.actionCreator) {
				dispatchProps.dispatchActionCreator(action.actionCreator, event, payload);
			} else {
				dispatchProps.dispatch(action.payload);
			}
		};
	});
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(Actions);
