import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';
import Content from './Content';
import theme from './List.scss';

function getToolbar(toolbar, id, displayMode, list) {
	const toolbarProps = {
		...toolbar,
		id
	};

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
	return (<Toolbar {...toolbarProps} />);
}

function getList(useContent, id, displayMode, list) {
	if (list.items && list.items.length) {
		return getDisplayModeComponent(useContent, id, displayMode, list);
	}

	return (<span className={theme['no-result']}>No result found</span>);
}

function getDisplayModeComponent(useContent, id, displayMode, list) {
	if (useContent) {
		return <Content id={id && `${id}-content`} displayMode={displayMode} {...list} />;
	}

	switch (displayMode) {
		case 'tile':
			return <DisplayTile id={id} {...list} />;
		case 'large':
			return <DisplayLarge id={id} {...list} />;
		default:
			return <DisplayTable id={id} {...list} />;
	}
}


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
	const classnames = classNames(
		'tc-list',
		theme.list,
	);
	return (
		<div className={classnames}>
			{toolbar && getToolbar(toolbar, id, displayMode, list)}
			{getList(useContent, id, displayMode, list)}
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
