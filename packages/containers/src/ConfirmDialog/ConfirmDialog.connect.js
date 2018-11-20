import cmf, { cmfConnect } from '@talend/react-cmf';
import { getActionsProps } from '../actionAPI';
import Container, { DEFAULT_STATE } from './ConfirmDialog.container';

export function mapStateToProps(state, props, cmfProps) {
	const context = {
		registry: cmf.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	const validateAction = cmfProps.state ? cmfProps.state.get('validateAction') : undefined;
	const cancelAction = cmfProps.state ? cmfProps.state.get('cancelAction') : undefined;
	const model = cmfProps.state ? cmfProps.state.get('model') : cmfProps.model;
	return {
		validateAction: getActionsProps(context, validateAction, model),
		cancelAction: getActionsProps(context, cancelAction, model),
	};
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => (ownProps && ownProps.id) || 'ConfirmDialog',
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
