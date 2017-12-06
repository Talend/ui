import React from 'react';
import { cmfConnect, Inject } from '@talend/react-cmf';
import SubHeaderBar, { DEFAULT_STATE } from './SubHeaderBar.container';

function buildComponents(state, injectedComponents) {
	return injectedComponents.map(injectedComponent => {
		const { componentId, tag, ...rest } = injectedComponent;
		if (componentId) {
			return Object.assign({}, tag, {
				injectedComponent: <Inject component={componentId} {...rest} />,
			});
		}
		return null;
	}).filter(component => component != null);
}

function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.injectedComponents) {
		const { center, right } = ownProps.injectedComponents;
		if (center) {
			props.componentsCenter = buildComponents(state, center);
		}
		if (right) {
			props.componentsRight = buildComponents(state, right);
		}
	}
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(SubHeaderBar);

export { buildComponents, mapStateToProps };
