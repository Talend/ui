import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { Actions, ActionDropdown } from '../../Actions';
import { cellTitleDisplayModes } from '../utils/constants';
import { DEFAULT_I18N } from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './CellTitleActions.scss';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;

export function CellTitleActionsComponent({
	rowData,
	actionsKey,
	displayMode,
	persistentActionsKey,
	id,
	t,
}) {
	const actions = [];

	if (displayMode === TITLE_MODE_TEXT) {
		const isDropdown = actionDef => actionDef.displayMode === 'dropdown';
		const actionDefinitions =
			rowData[actionsKey] && rowData[actionsKey].filter(actionDef => !isDropdown(actionDef));
		const dropdownDefinitions = rowData[actionsKey] && rowData[actionsKey].filter(isDropdown);

		actions.push(
			<div className={classNames('cell-title-actions', theme['cell-title-actions'])}>
				{actionDefinitions && (
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
				{dropdownDefinitions && (
					<Actions key={'dropdown-actions'} actions={dropdownDefinitions} hideLabel link />
				)}
			</div>,
		);
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
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(CellTitleActionsComponent);
