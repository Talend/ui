import PropTypes from 'prop-types';
import cmf, { cmfConnect } from '@talend/react-cmf';
import { ActionButton } from '@talend/react-components/lib/Actions';

export function mapStateToProps(state, ownProps) {
	let props = {};
	if (ownProps.actionId) {
		props = cmf.action.getActionInfo(
			{
				registry: cmf.registry.getRegistry(),
				store: {
					getState: () => state,
				},
			},
			ownProps.actionId,
		);
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = { ...ownProps, ...stateProps, ...dispatchProps };
	delete props.actionId;
	return props;
}

export function ContainerActionButton(props) {
	const newProps = { ...props };

	if (!newProps.onClick && (props.actionCreator || props.payload)) {
		newProps.onClick = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch({
					model: props.model,
					...props.payload,
				});
			}
		};
	}
	return <ActionButton {...newProps} />;
}

ContainerActionButton.displayName = 'Container(ActionButton)';

ContainerActionButton.propTypes = {
	actionCreator: PropTypes.string,
	dispatch: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	model: PropTypes.object,
	payload: PropTypes.object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
})(ContainerActionButton);
