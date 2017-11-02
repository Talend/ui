import { api, cmfConnect } from '@talend/react-cmf';
import { ActionFile } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId && !ownProps.name) {
		return {};
	}
	return api.action.getActionInfo({
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	}, ownProps.actionId || ownProps.name);
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	delete props.actionId;
	props.name = stateProps.name;
	props.onChange = (event, data) => {
		if (props.actionCreator) {
			dispatchProps.dispatchActionCreator(props.actionCreator, event, data);
		} else {
			dispatchProps.dispatch(
				Object.assign(
					{
						model: props.model,
					},
					props.payload,
					{ file: data },
				),
			);
		}
	};
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ActionFile);
