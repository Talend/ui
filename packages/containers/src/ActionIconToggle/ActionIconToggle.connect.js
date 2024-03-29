import PropTypes from 'prop-types';
import cmf, { cmfConnect } from '@talend/react-cmf';
import { ActionIconToggle } from '@talend/react-components/lib/Actions';

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

export function ContainerActionIconToggle(props) {
	const newProps = { ...props };

	if (!newProps.onClick) {
		newProps.onClick = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch(props.payload);
			}
		};
	}
	return <ActionIconToggle {...newProps} />;
}

ContainerActionIconToggle.displayName = 'Container(ActionIconToggle)';

ContainerActionIconToggle.propTypes = {
	actionCreator: PropTypes.string,
	dispatchActionCreator: PropTypes.func,
	dispatch: PropTypes.func,
	payload: PropTypes.object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerActionIconToggle);
