import PropTypes from 'prop-types';
import React from 'react';
import VirtualizedList, { SORT_BY, cellDictionary } from '../../VirtualizedList';
import CellTitle from '../../VirtualizedList/CellTitle';
import CellActions from '../../VirtualizedList/CellActions';

function adaptOnSort(onChange) {
	if (!onChange) {
		return null;
	}
	return function onSortChange({ sortBy, sortDirection }) {
		return onChange(null, { field: sortBy, isDescending: sortDirection === SORT_BY.DESC });
	};
}

export function HiddenHeader(props) {
	return <span className="sr-only">{props.label}</span>;
}

export function ListToVirtualizedList(props) {
	const { itemProps, sort, titleProps } = props;

	if (titleProps) {
		if (!titleProps.actionsKey) {
			titleProps.actionsKey = 'actions';
		}
		if (!titleProps.persistentActionsKey) {
			titleProps.persistentActionsKey = 'persistentActions';
		}
	}
	// Backward compatibility: find array in object attr:
	const supposedActions = {};
	if (props.items.length > 0) {
		const item = props.items[0];
		Object.keys(item)
			.filter(key => Array.isArray(item[key]))
			.forEach(key => {
				supposedActions[key] = true;
			});
	}
	return (
		<VirtualizedList
			id={props.id}
			collection={props.items}
			isActive={itemProps && itemProps.isActive}
			isSelected={itemProps && itemProps.isSelected}
			inProgress={props.inProgress}
			onRowClick={itemProps && itemProps.onRowClick}
			defaultHeight={props.defaultHeight}
			rowHeight={props.rowHeight}
			selectionToggle={itemProps && itemProps.onToggle}
			sort={adaptOnSort(sort && sort.onChange)}
			sortBy={sort && sort.field}
			sortDirection={sort && sort.isDescending ? SORT_BY.DESC : SORT_BY.ASC}
			type={props.displayMode.toUpperCase()}
			t={props.t}
		>
			{props.columns.map((column, index) => {
				const cProps = {
					label: column.label,
					dataKey: column.key,
				};
				if (titleProps && column.key === titleProps.key) {
					Object.assign(cProps, CellTitle, {
						columnData: titleProps,
					});
				} else if (supposedActions[column.key]) {
					Object.assign(cProps, CellActions);
				} else if (column.type && cellDictionary[column.type]) {
					Object.assign(cProps, cellDictionary[column.type], {
						columnData: column.data,
					});
				}
				if (column.hideHeader) {
					cProps.disableSort = true;
					cProps.headerRenderer = HiddenHeader;
				}
				return <VirtualizedList.Content key={index} {...cProps} />;
			})}
		</VirtualizedList>
	);
}

ListToVirtualizedList.propTypes = {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
	displayMode: PropTypes.oneOf(['large', 'table']),
	defaultHeight: PropTypes.number,
	itemProps: PropTypes.shape({
		isActive: PropTypes.func,
		isSelected: PropTypes.func,
		onRowClick: PropTypes.func,
		onToggle: PropTypes.func,
	}),
	items: PropTypes.arrayOf(PropTypes.object),
	inProgress: PropTypes.bool,
	rowHeight: PropTypes.number,
	sort: PropTypes.shape({
		onChange: PropTypes.func,
		field: PropTypes.string,
		isDescending: PropTypes.bool,
	}),
	titleProps: PropTypes.shape({
		actionsKey: PropTypes.string,
		presistentActionsKey: PropTypes.string,
		key: PropTypes.string,
	}),
	t: PropTypes.func,
};
ListToVirtualizedList.defaultProps = {
	displayMode: 'table',
};
HiddenHeader.propTypes = {
	label: PropTypes.string,
};
