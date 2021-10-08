import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import get from 'lodash/get';
import { Actions, ActionDropdown } from '../../Actions';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './CellTitleActions.scss';
import Action from '../../Actions/Action/Action.component';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;
const { LARGE } = listTypes;

const MAX_DIRECT_NB_ICON = 4;

function isDropdown(actionDef) {
	return actionDef.displayMode === 'dropdown';
}

function renderActionsGroup(getComponent) {
	return actions => (
		<Actions
			getComponent={getComponent}
			className={classNames('cell-title-actions', theme['cell-title-actions'])}
			key="large-display-actions"
			actions={actions}
			hideLabel
			link
		/>
	);
}

function getLargeDisplayActions(actions, getComponent) {
	if (!actions || !actions.length) {
		return null;
	}

	if (Array.isArray(actions) && actions.every(item => Array.isArray(item))) {
		return actions.map(renderActionsGroup(getComponent));
	}

	return renderActionsGroup(getComponent)(actions);
}

function getDefaultDisplayActions(actions, getComponent, t, id) {
	if (!actions || !actions.length) {
		return null;
	}

	const actionsBlocs = [];
	const hasFewActions = actions.length <= MAX_DIRECT_NB_ICON;

	// few actions : display them
	if (hasFewActions) {
		actionsBlocs.push(
			<Actions getComponent={getComponent} key="direct-actions" actions={actions} hideLabel link />,
		);
	} else {
		// lot of actions, we extract 2 actions (including all dropdowns) to display them directly
		// the rest is in an ellipsis dropdown
		// always extract dropdowns
		const extractedDropdownActions = actions.filter(isDropdown);
		const simpleActions = actions.filter(action => !isDropdown(action));

		// 1 slot taken by the ellipsis menu
		const nbOfSimpleToExtract = Math.max(
			0,
			MAX_DIRECT_NB_ICON - 1 - extractedDropdownActions.length,
		);

		// extract simple actions if space remaining
		const extractedSimpleActions =
			nbOfSimpleToExtract > 0 ? simpleActions.slice(0, nbOfSimpleToExtract) : [];

		const extractedActions = [...extractedDropdownActions, ...extractedSimpleActions];

		const remainingActions = simpleActions.slice(nbOfSimpleToExtract);

		extractedActions
			.sort((a, b) => actions.indexOf(a) - actions.indexOf(b))
			.forEach((action, i) => {
				actionsBlocs.push(
					<Action
						{...action}
						getComponent={getComponent}
						key={`extracted-action-${i}`}
						hideLabel
						link
					/>,
				);
			});

		// ellipsis dropdown
		actionsBlocs.push(
			<ActionDropdown
				id={`${id}-ellispsis-actions`}
				key="ellipsis-actions"
				className={classNames('cell-title-actions-menu', theme['cell-title-actions-menu'])}
				items={remainingActions}
				label={t('LIST_OPEN_ACTION_MENU', { defaultValue: 'Open menu' })}
				ellipsis
			/>,
		);
	}

	return (
		<div
			key="cell-title-actions"
			className={classNames('cell-title-actions', theme['cell-title-actions'])}
		>
			{actionsBlocs}
		</div>
	);
}

function getPersistentActions(actions, getComponent) {
	if (!actions || !actions.length) {
		return null;
	}
	return (
		<Actions
			key="persistent-actions"
			getComponent={getComponent}
			className={classNames('persistent-actions', theme['persistent-actions'])}
			actions={actions}
			hideLabel
			link
		/>
	);
}

function isAvailable(actionDef) {
	return actionDef.available !== false;
}

export function CellTitleActionsComponent({
	rowData,
	actionsKey,
	displayMode,
	getComponent,
	persistentActionsKey,
	id,
	t,
	type,
}) {
	let dataActions = get(rowData, actionsKey, []).filter(isAvailable);
	const persistentActions = get(rowData, persistentActionsKey, []);
	const hasActions = dataActions.length || persistentActions.length;
	if (displayMode !== TITLE_MODE_TEXT || !hasActions) {
		return null;
	}

	const actions = [];
	if (type === LARGE) {
		actions.push(getLargeDisplayActions(dataActions, getComponent));
	} else {
		// flatening in tab case
		if (Array.isArray(dataActions) && dataActions.every(item => Array.isArray(item))) {
			dataActions = dataActions.flatMap(item => item);
		}
		actions.push(getDefaultDisplayActions(dataActions, getComponent, t, id));
	}

	actions.push(getPersistentActions(persistentActions, getComponent));

	return (
		<div
			id={id}
			className={classNames('main-title-actions-group', theme['main-title-actions-group'])}
			onKeyDown={e => {
				e.stopPropagation();
			}}
		>
			{actions}
		</div>
	);
}

CellTitleActionsComponent.displayName = 'VirtualizedList(CellTitleActions)';
CellTitleActionsComponent.propTypes = {
	id: PropTypes.string.isRequired,
	// The actions property key. Actions = props.rowData[props.actionsKey]
	actionsKey: PropTypes.string,
	// The persistent actions property key. Actions = props.rowData[props.persistentActionsKey]
	persistentActionsKey: PropTypes.string,
	/** The display mode. */
	displayMode: PropTypes.oneOf([TITLE_MODE_TEXT, TITLE_MODE_INPUT]),
	getComponent: PropTypes.func,
	// The collection item.
	rowData: PropTypes.object,
	t: PropTypes.func.isRequired,
	type: PropTypes.oneOf([LARGE]),
};
CellTitleActionsComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellTitleActionsComponent);
