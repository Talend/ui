import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect, Inject } from '@talend/react-cmf';
import { ActionButton } from '@talend/react-components';

const DEPRECATED_EXPRESSION = ['active', 'available', 'disabled', 'inProgress'];

const warned = {};

function updateExpression(props) {
	const newProps = Object.assign({}, props);
	DEPRECATED_EXPRESSION.forEach(key => {
		if (typeof props[key] === 'string' || typeof props[key] === 'object') {
			if (!warned[key]) {
				warned[key] = true;
				console.warn(`Warning: please use ${key}Expression props instead
				to compute ${props.actionId} expression`);
			}
			newProps[`${key}Expression`] = props[key];
		}
	});
	return newProps;
}

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

		if (props.overlayComponent) {
			props.overlayComponent = (
				<Inject component={props.overlayComponent} {...props.overlayComponentProps} />
			);
		}

		props = updateExpression(props);
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	DEPRECATED_EXPRESSION.forEach(key => {
		if (typeof props[key] === 'string' || typeof props[key] === 'object') {
			delete props[key];
		}
	});
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

ContainerActionButton.displayName = 'Container(ActionButton)';

ContainerActionButton.propTypes = {
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
