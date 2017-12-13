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
				// eslint-disable-next-line no-console
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
	model: PropTypes.Object,
	overlayComponent: PropTypes.string,
	overlayComponentProps: PropTypes.object,
	payload: PropTypes.Object,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionButton);
