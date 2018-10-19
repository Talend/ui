import get from 'lodash/get';
import cmf, { cmfConnect } from '@talend/react-cmf';
import zip from 'lodash/zip';
import Container, { DEFAULT_STATE } from './SidePanel.container';
import { ACTION_TYPE_LINK } from './constants';

const cache = {};

/**
 * Memoize per component on a key the result of the fn call
 * @param {function} fn
 * @param {string} componentId,
 */
function memoizeOne(fn, componentId = 'default', actions, currentRoute) {
	if (!cache[componentId]) {
		cache[componentId] = {};
	}
	const currentCache = cache[componentId];
	if (currentCache.actions !== actions || currentCache.route !== currentRoute) {
		currentCache.actions = actions;
		currentCache.route = currentRoute;
		currentCache.value = fn.apply();
	}
	return currentCache.value;
}

function splitPath(path) {
	return path.split('/').filter(Boolean);
}

function isBasePathOf(pathToCheck, fullPath) {
	const pathToCheckSplit = splitPath(pathToCheck);
	const fullPathSplit = splitPath(fullPath);

	return zip(pathToCheckSplit, fullPathSplit)
		.filter(([path]) => Boolean(path))
		.every(path => path[0] === path[1]);
}

function getActionsWrapped(actions) {
	return actions.map(action => {
		if (action.href && !action.onClick && !action.onClickDispatch && !action.onClickActionCreator) {
			return {
				...action,
				onClick: event => {
					event.preventDefault();
					event.stopPropagation();
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

export function mapStateToProps(state, ownProps) {
	const props = {};
	const currentRoute = cmf.selectors.router.getPath(state);
	const componentId = ownProps.componentId;
	if (ownProps.actionIds) {
		props.actions = memoizeOne(
			() => ownProps.actionIds.map(id => getAction(id, currentRoute, state)),
			componentId,
			ownProps.actionIds,
			currentRoute,
		);
	} else if (ownProps.actions) {
		props.actions = memoizeOne(
			() => getActionsWrapped(ownProps.actions),
			componentId,
			ownProps.actions,
			currentRoute,
		);
		props.selected = getSelectedAction(currentRoute, props.actions);
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	keepComponentState: true,
	mapStateToProps,
	mergeProps,
})(Container);
