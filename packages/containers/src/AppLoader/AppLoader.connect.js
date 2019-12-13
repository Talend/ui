import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { cmfConnect } from '@talend/react-cmf';
import AppLoader from '@talend/react-components/lib/AppLoader';
import Inject from '@talend/react-components/lib/Inject';
import { appLoaderSaga } from './AppLoader.saga';

const CustomInject = cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Inject);

const appLoaderRenderer = appLoaderElement => appLoaderElement;

/**
 * This container show the application's loader & bootstrap the app
 * @param {object} props the component props
 * @param {boolean} props.loading tell if the app loader should show the loader or the content
 * @param {function} props.renderer lets you customise the way we display the loader in the app
 * @param {object} props.children react element to show
 */
export function AppLoaderContainer({ loading, renderer = appLoaderRenderer, children, ...rest }) {
	if (loading) {
		return renderer(<AppLoader {...rest} />);
	}

	const injected = Inject.all(rest.getComponent, rest.components, CustomInject);
	return (
		<div>
			{injected('before-children')}
			{children || null}
			{injected('after-children')}
		</div>
	);
}

AppLoaderContainer.displayName = 'AppLoader';
AppLoaderContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	loading: PropTypes.bool,
	renderer: PropTypes.func,
};

/**
 * calculate the loading attribute with the given props
 * @param {object} state the redux state
 * @param {object} ownProps the component props
 */
export function mapStateToProps(state, ownProps) {
	return {
		loading: !get(ownProps, 'hasCollections', []).every(collectionName =>
			state.cmf.collections.has(collectionName),
		),
	};
}

const connected = cmfConnect({
	mapStateToProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(AppLoaderContainer);

connected.sagas = {
	appLoaderSaga,
};

export default connected;
