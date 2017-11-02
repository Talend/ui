import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionButton } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId && !ownProps.name) {
		return {};
	}
	return api.action.getActionInfo(
		{
			registry: api.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		ownProps.actionId || ownProps.name,
	);
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	return props;
}

export function ContainerActionButton(props) {
	const newProps = Object.assign({}, props);
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

ContainerActionButton.displayName = 'ContainerActionButton';

ContainerActionButton.propTypes = {
	onClick: PropTypes.func,
	actionCreator: PropTypes.string,
	dispatch: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	model: PropTypes.Object,
	payload: PropTypes.Object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionButton);
