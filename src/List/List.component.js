import React, { PropTypes } from 'react';
import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';

/**
 * @param {object} props react props
 * @example
const props = {
	displayMode: 'table' / 'large' / 'tile' / component
	list: {
		items: [{}, {}, ...],
		columns: [
			{key, label},
			{key, label},
		]
	},
	toolbar: {
		display: {
			onChange: function,
		},
		sort: {
			field: key,
			options: [
				{key, label},
			],
			isDescending: true / false,
			onChange: function,
		},
		pagination: {
			onChange: function,
			itemsLength: number,
		},
		filter: {
			onFilter: function,
		},
	}
}
<List {...props}></List>
 */
function List({ id, displayMode, toolbar, list }) {
	let displayModeComponent;
	switch (displayMode) {
	case 'tile':
		displayModeComponent = DisplayTile;
		break;
	case 'large':
		displayModeComponent = DisplayLarge;
		break;
	default:
		if (typeof displayMode === 'function') {
			displayModeComponent = displayMode;
		} else {
			displayModeComponent = DisplayTable;
		}
		break;
	}

	const content = React.createElement(
		displayModeComponent,
		{ id, ...list }
	);
	let toolbarProps;
	if (toolbar) {
		toolbarProps = Object.assign({}, toolbar, { id });
		if (toolbar.display) {
			toolbarProps.display.mode = displayMode;
		}
		if (list.itemProps && list.itemProps.isSelected && list.itemProps.onToggleAll) {
			toolbarProps.selectAllCheckbox = {
				id,
				items: list.items,
				isSelected: list.itemProps.isSelected,
				onToggleAll: list.itemProps.onToggleAll,
			};
		}
	}
	return (
		<div className="tc-list">
			{toolbar && (<Toolbar {...toolbarProps} />)}
			{content}
		</div>
	);
}

List.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.shape(DisplayPropTypes),
	toolbar: PropTypes.shape(Toolbar.propTypes),
};

export default List;
