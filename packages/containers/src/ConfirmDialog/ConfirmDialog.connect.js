import { cmfConnect, api } from '@talend/react-cmf';
import { getActionsProps } from '../actionAPI';
import Container, { DEFAULT_STATE } from './ConfirmDialog.container';

export function mapStateToProps(state, props, cmfProps) {
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	const validateAction = cmfProps.state ? cmfProps.state.getIn(['validateAction']) : undefined;
	const cancelAction = cmfProps.state ? cmfProps.state.getIn(['cancelAction']) : undefined;

	return {
		validateAction: getActionsProps(context, validateAction, props.model),
		cancelAction: getActionsProps(context, cancelAction, props.model),
	};
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => (ownProps && ownProps.id) || 'ConfirmDialog',
	mapStateToProps
})(Container);
