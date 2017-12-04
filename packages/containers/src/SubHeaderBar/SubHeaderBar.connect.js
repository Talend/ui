import React from 'react';
import { cmfConnect, Inject } from '@talend/react-cmf';
import SubHeaderBar, { DEFAULT_STATE } from './SubHeaderBar.container';

function buildActions(state, injectedComponents) {
	return injectedComponents.map(injectedComponent => {
		const { componentId, tag, ...rest } = injectedComponent;
		if (componentId) {
			return Object.assign({}, tag, {
				injectedComponent: <Inject component={componentId} {...rest} />,
			});
		}
		return null;
	});
}

function mapStateToProps(state, ownProps) {
	const props = {};
	const { left, center, right } = ownProps.injectedComponents;
	if (left) {
		props.componentsRight = buildActions(state, left);
	}
	if (center) {
		props.componentsCenter = buildActions(state, center);
	}
	if (right) {
		props.componentsRight = buildActions(state, right);
	}
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(SubHeaderBar);
