import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import get from 'lodash/get';
import { Actions, ActionDropdown } from '../../Actions';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './CellTitleActions.scss';
import Action from '../../Actions/Action/Action.component';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;
const { LARGE } = listTypes;

const MAX_DIRECT_NB_ICON = 3;

function isDropdown(actionDef) {
	return actionDef.displayMode === 'dropdown';
}

function getLargeDisplayActions(actions) {
	if (!actions || !actions.length) {
		return null;
	}

	return (
		<Actions
			className={classNames('cell-title-actions', theme['cell-title-actions'])}
			key={'large-display-actions'}
			actions={actions}
			hideLabel
			link
		/>
	);
}

function getDefaultDisplayActions(actions, t) {
	if (!actions || !actions.length) {
		return null;
	}

	const actionsBlocs = [];
	const hasFewActions = actions.length <= MAX_DIRECT_NB_ICON;

	// few actions : display them
	if (hasFewActions) {
		actionsBlocs.push(<Actions key={'direct-actions'} actions={actions} hideLabel link />);
	}
	// lot of actions, we extract 2 actions (including all dropdowns) to display them directly
	// the rest is in an ellipsis dropdown
	else {
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
				actionsBlocs.push(<Action {...action} key={`extracted-action-${i}`} hideLabel link />);
			});

		// ellipsis dropdown
		actionsBlocs.push(
			<ActionDropdown
				key={'ellipsis-actions'}
				className={classNames('cell-title-actions-menu', theme['cell-title-actions-menu'])}
				items={remainingActions}
				label={t('LIST_OPEN_ACTION_MENU', { defaultValue: 'Open menu' })}
				hideLabel
				link
				noCaret
			/>,
		);
	}

	return (
		<div className={classNames('cell-title-actions', theme['cell-title-actions'])}>
			{actionsBlocs}
		</div>
	);
}

function getPersistentActions(actions) {
	if (!actions || !actions.length) {
		return null;
	}
	return (
		<Actions
			key={'persistent-actions'}
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
	persistentActionsKey,
	id,
	t,
	type,
}) {
	const dataActions = get(rowData, actionsKey, []).filter(isAvailable);
	const persistentActions = get(rowData, persistentActionsKey, []);
	const hasActions = dataActions.length || persistentActions.length;
	if (displayMode !== TITLE_MODE_TEXT || !hasActions) {
		return null;
	}

	const actions = [];
	if (type === LARGE) {
		actions.push(getLargeDisplayActions(dataActions));
	} else {
		actions.push(getDefaultDisplayActions(dataActions, t));
	}

	actions.push(getPersistentActions(persistentActions));

	return (
		<div
			id={id}
			className={classNames('main-title-actions-group', theme['main-title-actions-group'])}
		>
			{actions}
		</div>
	);
}

CellTitleActionsComponent.displayName = 'VirtualizedList(CellTitleActions)';
CellTitleActionsComponent.propTypes = {
	id: PropTypes.string,
	// The actions property key. Actions = props.rowData[props.actionsKey]
	actionsKey: PropTypes.string,
	// The persistent actions property key. Actions = props.rowData[props.persistentActionsKey]
	persistentActionsKey: PropTypes.string,
	/** The display mode. */
	displayMode: PropTypes.oneOf([TITLE_MODE_TEXT, TITLE_MODE_INPUT]),
	// The collection item.
	rowData: PropTypes.object,
	t: PropTypes.func.isRequired,
	type: PropTypes.oneOf([LARGE]),
};
CellTitleActionsComponent.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(CellTitleActionsComponent);
