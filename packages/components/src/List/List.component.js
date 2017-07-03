import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Toolbar from './Toolbar';
import DisplayPropTypes from './Display/Display.propTypes';
import DisplayLarge from './DisplayLarge';
import DisplayTable from './DisplayTable';
import DisplayTile from './DisplayTile';
import Content from './Content';
import ListToVirtualizedList from './ListToVirtualizedList';
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

function DisplayModeComponent({ id, useContent, displayMode, list, virtualized }) {
	if (useContent) {
		return (
			<Content
				id={id && `${id}-content`}
				displayMode={displayMode}
				{...list}
			/>
		);
	}
	if (virtualized) {
		return (
			<div className={'tc-list-display-virtualized'}>
				<ListToVirtualizedList
					id={id}
					displayMode={displayMode}
					{...list}
				/>
			</div>
		);
	}
	switch (displayMode) {
	case 'tile': return <DisplayTile id={id} {...list} />;
	case 'large': return <DisplayLarge id={id} {...list} />;
	default: return <DisplayTable id={id} {...list} />;
	}
}
DisplayModeComponent.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.string,
	list: PropTypes.oneOfType([
		PropTypes.shape(DisplayPropTypes),
		PropTypes.shape(Content.propTypes),
	]),
	useContent: PropTypes.bool,
	virtualized: PropTypes.bool,
};

function ListDisplay({ id, useContent, displayMode, list, virtualized }) {
	return (
		<DisplayModeComponent
			id={id}
			useContent={useContent}
			displayMode={displayMode}
			list={list}
			virtualized={virtualized}
		/>
	);
}
ListDisplay.propTypes = DisplayModeComponent.propTypes;


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
function List({ id, displayMode, toolbar, list, useContent, virtualized }) {
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
			<ListDisplay
				id={id}
				useContent={useContent}
				displayMode={displayMode}
				list={list}
				virtualized={virtualized}
			/>
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
