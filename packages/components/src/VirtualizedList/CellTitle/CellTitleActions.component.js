import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '../../Actions';
import { cellTitleDisplayModes } from '../utils/constants';

import theme from './CellTitleActions.scss';

const { TITLE_MODE_INPUT, TITLE_MODE_TEXT } = cellTitleDisplayModes;

function CellTitleActions({ rowData, actionsKey, displayMode, persistentActionsKey }) {
	const actions = [];

	if (displayMode === TITLE_MODE_TEXT) {
		actions.push(<Actions actions={rowData[actionsKey]} hideLabel link />);
		actions.push(
			<Actions
				className={classNames('persistent-actions', theme['persistent-actions'])}
				actions={rowData[persistentActionsKey]}
				hideLabel
				link
			/>,
		);
	}

	return <div className={classNames('main-title-actions-group', theme['main-title-actions-group'])}>{actions}</div>;
}

CellTitleActions.displayName = 'VirtualizedList(CellTitleActions)';
CellTitleActions.propTypes = {
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
