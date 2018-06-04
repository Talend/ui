import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import { translate } from 'react-i18next';
import { Actions, ActionDropdown } from '../../Actions';
import { cellTitleDisplayModes, listTypes } from '../utils/constants';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './CellTitleActions.scss';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;
const { LARGE } = listTypes;

function isDropdown(actionDef) {
	return actionDef.displayMode === 'dropdown';
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
	const actions = [];
	const rowActions = get(rowData, actionsKey, []).filter(isAvailable);

	if (displayMode === TITLE_MODE_TEXT) {
		if (type === LARGE) {
			actions.push(
				<Actions
					className={classNames('cell-title-actions', theme['cell-title-actions'])}
					key={actions.length}
					actions={rowActions}
					hideLabel
					link
				/>,
			);
		} else {
			const actionDefinitions =
				rowActions && rowActions.filter(actionDef => !isDropdown(actionDef));
			const dropdownDefinitions = rowActions && rowActions.filter(isDropdown);

			actions.push(
				<div className={classNames('cell-title-actions', theme['cell-title-actions'])}>
					{dropdownDefinitions.length > 0 && (
						<Actions key={'dropdown-actions'} actions={dropdownDefinitions} hideLabel link />
					)}
					{actionDefinitions.length > 0 && (
						<ActionDropdown
							id={id}
							className={classNames('cell-title-actions-menu', theme['cell-title-actions-menu'])}
							items={actionDefinitions}
							label={t('LIST_OPEN_ACTION_MENU', { defaultValue: 'Open menu' })}
							hideLabel
							link
							noCaret
						/>
					)}
				</div>,
			);
		}
		actions.push(
			<Actions
				key={actions.length}
				className={classNames('persistent-actions', theme['persistent-actions'])}
				actions={rowData[persistentActionsKey]}
				hideLabel
				link
			/>,
		);
	}

	return (
		<div className={classNames('main-title-actions-group', theme['main-title-actions-group'])}>
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
