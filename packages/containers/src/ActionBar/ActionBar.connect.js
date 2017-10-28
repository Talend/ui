import { api, cmfConnect } from '@talend/react-cmf';
import { ActionBar } from '@talend/react-components';
import { getActionsProps } from '../actionAPI';
import Action from '../Action';
import Actions from '../Actions';

const renderers = {
	Action,
	Actions,
};

function getActions(context, idOrInfo, model) {
	if (typeof idOrInfo === 'string') {
		return getActionsProps(context, idOrInfo, model);
	} else if (idOrInfo.displayMode === 'splitDropdown') {
		return Object.assign({
			displayMode: idOrInfo.displayMode,
			items: getActionsProps(context, idOrInfo.items, model),
		}, getActionsProps(context, idOrInfo.name, model));
	} else if (idOrInfo.displayMode === 'btnGroup') {
		return {
			displayMode: idOrInfo.displayMode,
			actions: getActionsProps(context, idOrInfo.actions, model),
		};
	}
	return undefined;
}

function mapStateToProps(state, { actions, actionIds, ...props }) {
	const actionsProps = actions || {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (actionIds) {
		const { left, right } = actionIds;
		if (left) {
			actionsProps.left = left.map(info => getActions(context, info, props.model));
		}
		if (right) {
			actionsProps.right = right.map(info => getActions(context, info, props.model));
		}
	}

	return {
		actions: actionsProps,
		renderers,
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	delete props.actionIds;
	if (props.actions) {
		if (props.actions.left) {

		}
		if (props.actions.right) {

		}
	}
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ActionBar);
