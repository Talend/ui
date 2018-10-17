import get from 'lodash/get';
import cmf, { cmfConnect } from '@talend/react-cmf';
import zip from 'lodash/zip';
import Container, { DEFAULT_STATE } from './SidePanel.container';
import { ACTION_TYPE_LINK } from './constants';

const cache = {};

function splitPath(path) {
	return path.replace(/^(\/)/, '').split('/');
}

function isBasePathOf(pathToCheck, fullPath) {
	const pathToCheckSplit = splitPath(pathToCheck);
	const fullPathSplit = splitPath(fullPath);

	return zip(pathToCheckSplit, fullPathSplit)
		.filter(([pathToCheckPart]) => pathToCheckPart !== undefined)
		.every(([pathToCheckPart, fullPathPart]) => pathToCheckPart === fullPathPart);
}

const getActionsWrapped = actions => actions.map(action => {
	if (!action.href) {
		return action;  // do not change ref
	}
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

const getSelectedAction = (currentRoute, actions) => actions
	.find(action => action.href && isBasePathOf(action.href, currentRoute));

export function mapStateToProps(state, ownProps) {
	const props = {};
	const currentRoute = cmf.selectors.router.getPath(state);
	if (ownProps.actionIds) {
		const cacheKey = `${currentRoute}-${ownProps.actionIds.join('#')}`;
		if (!cache[cacheKey]) {
			cache[cacheKey] = ownProps.actionIds.map(id => {
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
				let route = get(info, 'payload.cmf.routerReplace');
				if (!route) {
					route = get(info, 'payload.cmf.routerPush');
				}
				if (!route) {
					route = get(info, 'href');
				}
				if (route) {
					if (currentRoute.indexOf(route) !== -1) {
						action.active = true;
					}
				}
				return action;
			});
		}
		props.actions = cache[cacheKey];
	} else if (ownProps.actions) {
		const cacheKey = ownProps.componentId || 'default';
		if (!cache[cacheKey]) {
			cache[cacheKey] = getActionsWrapped(ownProps.actions);
		}
		props.actions = cache[cacheKey];

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
