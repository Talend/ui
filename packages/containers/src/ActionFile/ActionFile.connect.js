import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionFile } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId) {
		return {};
	}
	return api.action.getActionInfo(
		{
			registry: api.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		ownProps.actionId,
	);
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	props.name = stateProps.name;
	return props;
}

export function ContainerActionFile({ onChange, ...props }) {
	const newProps = Object.assign({}, props);
	if (!onChange) {
		newProps.onChange = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch(
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
	}
	return <ActionFile {...newProps} />;
}

ContainerActionFile.displayName = 'ContainerActionFile';

ContainerActionFile.propTypes = {
	onChange: PropTypes.func,
	actionCreator: PropTypes.string,
	dispatch: PropTypes.func,
	dispatchActionCreator: PropTypes.func,
	model: PropTypes.Object,
	payload: PropTypes.Object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionFile);
