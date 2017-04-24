import React, { PropTypes } from 'react';
import classNames from 'classnames';
import VirtualizedList, { cellDictionnary } from '../VirtualizedList';
import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import Content from './Content';
import theme from './List.scss';

function ListToolbar({ id, toolbar, displayMode, list }) {
	if (!toolbar) {
		return null;
	}

	const toolbarProps = {
		...toolbar,
		id,
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
ListToolbar.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.oneOfType([
		PropTypes.shape(DisplayPropTypes),
		PropTypes.shape(Content.propTypes),
	]),
	toolbar: PropTypes.shape(Toolbar.propTypes),
};

function getCellRendererConfig(type, list) {
	const columnData = type === 'title' ?
		list.titleProps :
		null;

	return {
		...cellDictionnary[type],
		columnData,
	};
}

function ListDisplay({ id, displayMode, list }) {
	return (
		<VirtualizedList
			collection={list.items}
			id={id}
			sort={list.sort && list.sort.onChange}
			sortBy={list.sort && list.sort.field}
			sortDirection={list.sort && list.sort.isDescending ? 'DESC' : 'ASC'}
			type={displayMode.toUpperCase()}
		>
			{list.columns.map(col => (
				<VirtualizedList.Content
					label={col.label}
					dataKey={col.key}
					disableSort={col.disableSort}
					width={col.width}
					flexShrink={col.flexShrink}
					flexGrow={col.flexGrow}
					{...getCellRendererConfig(col.type, list)}
				/>
			))}
		</VirtualizedList>
	);
}
ListDisplay.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.shape(DisplayPropTypes),
};

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
			<ListToolbar
				id={id}
				toolbar={toolbar}
				displayMode={displayMode}
				list={list}
			/>
			<div className="tc-list-display">
				<ListDisplay
					id={id}
					useContent={useContent}
					displayMode={displayMode}
					list={list}
				/>
			</div>
		</div>
	);
}

List.propTypes = {
	...ListToolbar.propTypes,
	...ListDisplay.propTypes,
};

List.defaultProps = {
	displayMode: 'table',
	useContent: false,
};

export default List;
