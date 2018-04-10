import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions, ActionDropdown } from '../../Actions';
import { cellTitleDisplayModes } from '../utils/constants';

import theme from './CellTitleActions.scss';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;

function CellTitleActions({ rowData, actionsKey, displayMode, persistentActionsKey, id }) {
	const actions = [];

	if (displayMode === TITLE_MODE_TEXT) {
		const isDropdown = actionDef => actionDef.displayMode === 'dropdown';
		const actionDefinitions =
			rowData[actionsKey] && rowData[actionsKey].filter(actionDef => !isDropdown(actionDef));
		const dropdownDefinitions =
			rowData[actionsKey] && rowData[actionsKey].filter(isDropdown);

		actions.push(
			<div className={classNames('cell-title-actions', theme['cell-title-actions'])}>
				{actionDefinitions && <ActionDropdown
					id={id}
					className={classNames('cell-title-actions-menu', theme['cell-title-actions-menu'])}
					items={actionDefinitions}
					label={'TODO translate me : Open menu'}
					hideLabel
					link
					noCaret
				/>}
				{dropdownDefinitions && <Actions
					key={'dropdown-actions'}
					actions={dropdownDefinitions}
					hideLabel
					link
				/>}
			</div>
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

CellTitleActions.displayName = 'VirtualizedList(CellTitleActions)';
CellTitleActions.propTypes = {
	id: PropTypes.string,
	// The actions property key. Actions = props.rowData[props.actionsKey]
	actionsKey: PropTypes.string,
	// The persistent actions property key. Actions = props.rowData[props.persistentActionsKey]
	persistentActionsKey: PropTypes.string,
	/** The display mode. */
	displayMode: PropTypes.oneOf([TITLE_MODE_TEXT, TITLE_MODE_INPUT]),
	// The collection item.
	rowData: PropTypes.object, // eslint-disable-line
};

export default CellTitleActions;
