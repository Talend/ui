import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionIconToggle } from '@talend/react-components';

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

export function ContainerActionIconToggle(props) {
	const newProps = Object.assign({}, props);

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
})(ContainerActionIconToggle);
