import get from 'lodash/get';
import { withRouter } from 'react-router';
import cmf, { cmfConnect } from '@talend/react-cmf';
import { routerAPI } from '@talend/react-cmf-router';
import Container, { DEFAULT_STATE } from './SidePanel.container';
import { ACTION_TYPE_LINK } from './constants';

const cache = {};

/**
 * return the cache structure to support one cache per componentId
 * @param componentId used to create entry in the cache
 * @param currentRoute used as cache key
 * @param actions the current actions used as cacheKey by reference
 */
function getCache(componentId = 'default', currentRoute, actions) {
	if (!cache[componentId]) {
		cache[componentId] = {};
	}
	if (cache[componentId].route !== currentRoute || cache[componentId].actions !== actions) {
		// invalidate the cache
		cache[componentId] = {
			route: currentRoute,
			actions,
		};
	}
	return cache[componentId];
}

/**
 * This function check if our current action point to a route which is the parent of the current
 * @param {string} actionPath the path of the action
 * @param {string} currentPath the pathname in the browser location
 */
function isBasePathOf(actionPath, currentPath) {
	const length = actionPath.length;
	if (currentPath.length + 1 === length) {
		return `${currentPath}/` === actionPath;
	}
	if (currentPath.length === length) {
		return currentPath === actionPath;
	}
	if (currentPath.length < length) {
		return false;
	}
	return actionPath === currentPath.slice(0, length) && currentPath[length] === '/';
}

/**
 * This function use on each action the attribute href to build the onClick
 * @param {Array} actions the list of all Action props you want.
 * @return a new actions Array ready to be used by the SidePanel
 */
function getActionsWrapped(actions) {
	return actions.map(action => {
		if (action.href && !action.onClick && !action.onClickDispatch && !action.onClickActionCreator) {
			return {
				...action,
				onClick: event => {
					if (!event.metaKey && !event.ctrlKey) {
						event.preventDefault();
						event.stopPropagation();
					}
				},
				onClickDispatch: {
					type: ACTION_TYPE_LINK,
					cmf: {
						routerPush: action.href,
					},
				},
			};
		}
		return action;
	});
}

function getSelectedAction(currentRoute, actions) {
	return actions.find(action => action.href && isBasePathOf(action.href, currentRoute));
}

/**
 * DEPRECATED: This is kept to not create any breaking change.
 * This function use the deprecated api `cmf.action.getActionInfo`
 * @param {string} id the action id you want to get in your settings
 * @param {string} currentRoute the pathname in the browser location
 * @param {Object} state redux state to create fake context for getActionInfo
 * @return a new actions Array ready to be used by the SidePanel
 */
function getAction(id, currentRoute, state) {
	const action = { actionId: id };
	const info = cmf.action.getActionInfo(
		{
			registry: cmf.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		id,
	);
	action.label = info.label;
	action.id = info.id;

	const route = get(
		info,
		'payload.cmf.routerReplace',
		get(info, 'payload.cmf.routerPush', get(info, 'href')),
	);

	if (route && isBasePathOf(route, currentRoute)) {
		action.active = true;
	}
	return action;
}

/**
 * This function take care of perfomance to ensure we give the same array of actions
 * if we are on the same route for the same component with the same props
 * @param {Object} state the redux state
 * @param {Object} ownProps the props applied to the current component instance
 * @param {string} currentRoute the pathname in the browser location
 * @return {Array} array of actions ready for the sidepanel and cached to keep good performance
 */
function getActions(state, ownProps, currentRoute) {
	if (ownProps.actions) {
		const cacheAction = getCache(ownProps.componentId, currentRoute, ownProps.actions);
		if (!cacheAction.value) {
			cacheAction.value = getActionsWrapped(ownProps.actions);
		}
		return cacheAction.value;
	} else if (ownProps.actionIds) {
		const cacheAction = getCache(ownProps.componentId, currentRoute, ownProps.actionIds);
		if (!cacheAction.value) {
			cacheAction.value = ownProps.actionIds.map(id => getAction(id, currentRoute, state));
		}
		return cacheAction.value;
	}
	return undefined;
}

export function mapStateToProps(state, ownProps) {
	const props = {};
	const currentRoute = routerAPI.selectors.getPath(state);
	props.actions = getActions(state, ownProps, currentRoute);
	if (ownProps.actions) {
		props.selected = getSelectedAction(currentRoute, props.actions);
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = { ...ownProps, ...stateProps, ...dispatchProps };
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export default withRouter(
	cmfConnect({
		defaultState: DEFAULT_STATE,
		omitCMFProps: true,
		withComponentRegistry: true,
		withDispatch: true,
		withDispatchActionCreator: true,
		withComponentId: true,
		keepComponentState: true,
		mapStateToProps,
		mergeProps,
	})(Container),
);
