import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect, Inject } from '@talend/react-cmf';
import { ActionButton } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	let props = {};
	if (ownProps.actionId) {
		props = api.action.getActionInfo(
			{
				registry: api.registry.getRegistry(),
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
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	return props;
}

export function ContainerActionButton(props) {
	const newProps = Object.assign({}, props);

	if (typeof props.overlayComponent === 'string' && props.overlayComponent) {
		newProps.overlayComponent = (
			<Inject component={props.overlayComponent} {...props.overlayComponentProps} />
		);

		delete newProps.overlayComponentProps;
	}

	if (!newProps.onClick) {
		newProps.onClick = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch(
					Object.assign(
						{
							model: props.model,
						},
						props.payload,
					),
				);
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
	overlayComponent: PropTypes.string,
	overlayComponentProps: PropTypes.object,
	payload: PropTypes.object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionButton);
