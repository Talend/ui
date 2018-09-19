import get from 'lodash/get';
import cmf, { cmfConnect } from '@talend/react-cmf';
import zip from 'lodash/zip';
import memoizeOne from 'memoize-one';
import { withRouter } from 'react-router';
import Container, { DEFAULT_STATE } from './SidePanel.container';

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

const getActionsWrapped = memoizeOne(menuActions =>
	menuActions.map(menuAction => {
		const { path, ...actionProps } = menuAction;
		const action = {
			...actionProps,
		};

		if (path) {
			action.onClickDispatch = {
				type: 'MENU_LINK',
				cmf: {
					routerReplace: path,
				},
			};
		}

		return {
			action,
			menuAction,
		};
	}),
);

const getActionsFromWrapper = memoizeOne(actionsWrapped =>
	actionsWrapped.map(({ action }) => action),
);

const getSelectedAction = memoizeOne((currentRoute, actionsWrapped) => {
	const actionsSelected = actionsWrapped
		.filter(({ menuAction }) => menuAction.path && isBasePathOf(menuAction.path, currentRoute))
		.map(({ action }) => action);
	return actionsSelected[0] || undefined;
});

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionIds) {
		props.actions = ownProps.actionIds.map(id => {
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
				const currentRoute = ownProps.location.pathname;
				if (currentRoute.indexOf(route) !== -1) {
					action.active = true;
				}
			}
			return action;
		});
	} else if (ownProps.menuActions) {
		const actionsWrapped = getActionsWrapped(ownProps.menuActions);

		props.actions = getActionsFromWrapper(actionsWrapped);

		const currentRoute = ownProps.location.pathname;

		props.selected = getSelectedAction(currentRoute, actionsWrapped);
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionIds) {
		delete props.actionIds;
	}
	if (props.menuActions) {
		delete props.menuActions;
	}
	return props;
}

export default withRouter(
	cmfConnect({
		defaultState: DEFAULT_STATE,
		keepComponentState: true,
		mapStateToProps,
		mergeProps,
	})(Container),
);
