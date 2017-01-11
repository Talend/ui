import React, { PropTypes } from 'react';
import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';
import Content from './Content';

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
function List({ id, displayMode, toolbar, list, useContent }) {
	const getDisplayModeComponent = () => {
		switch (displayMode) {
		case 'tile':
			return <DisplayTile id={id} {...list} />;
		case 'large':
			return <DisplayLarge id={id} {...list} />;
		default:
			return <DisplayTable id={id} {...list} />;
		}
	};
	const getContent = () => (
		<Content id={id && `${id}-content`} displayMode={displayMode} {...list} />
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
			{useContent ? getContent() : getDisplayModeComponent()}
		</div>
	);
}

List.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.oneOfType([
		PropTypes.shape(DisplayPropTypes),
		PropTypes.shape(Content.propTypes),
	]),
	toolbar: PropTypes.shape(Toolbar.propTypes),
	useContent: PropTypes.bool,
};

List.defaultProps = {
	displayMode: 'table',
	useContent: false,
};

export default List;
