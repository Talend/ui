import PropTypes from 'prop-types';
import React from 'react';
import VirtualizedList from '../../VirtualizedList';

function adaptOnSort(onChange) {
	if (!onChange) {
		return null;
	}
	return function onSortChange({ sortBy, sortDirection }) {
		return onChange(null, {
			field: sortBy,
			isDescending: sortDirection === VirtualizedList.SORT_BY.DESC,
		});
	};
}

export function HiddenHeader(props) {
	return <span className="sr-only">{props.label}</span>;
}

export function compareOrder(a, b) {
	if (!Number.isInteger(a.order) && !Number.isInteger(b.order)) {
		return 0;
	}
	if (Number.isInteger(a.order) && !Number.isInteger(b.order)) {
		return -1;
	}
	if (!Number.isInteger(a.order) && Number.isInteger(b.order)) {
		return 1;
	}
	return a.order - b.order;
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

	// Allow to override or add new cell renderer from outside
	const listCellDictionary = { ...VirtualizedList.cellDictionary, ...props.cellDictionary };
	const listHeaderDictionary = { ...VirtualizedList.headerDictionary, ...props.headerDictionary };
	return (
		<VirtualizedList
			collection={props.items}
			defaultHeight={props.defaultHeight}
			id={props.id}
			inProgress={props.inProgress}
			isActive={itemProps && itemProps.isActive}
			isSelected={itemProps && itemProps.isSelected}
			noRowsRenderer={props.noRowsRenderer}
			onRowClick={itemProps && itemProps.onRowClick}
			onRowDoubleClick={titleProps && titleProps.onClick}
			onToggleAll={itemProps && itemProps.onToggleAll}
			rowHeight={props.rowHeight}
			rowRenderers={props.rowRenderers}
			selectionToggle={itemProps && itemProps.onToggle}
			sort={adaptOnSort(sort && sort.onChange)}
			sortBy={sort && sort.field}
			sortDirection={
				sort && sort.isDescending ? VirtualizedList.SORT_BY.DESC : VirtualizedList.SORT_BY.ASC
			}
			type={props.displayMode.toUpperCase()}
		>
			{props.columns
				.filter(item => !item.hidden)
				.sort(compareOrder)
				.map((column, index) => {
					const cProps = {
						label: column.label,
						dataKey: column.key,
						disableSort: column.disableSort,
						width: -1, // valid propType but disable inline style
						...column,
					};
					if (titleProps && column.key === titleProps.key) {
						Object.assign(cProps, listCellDictionary.title, {
							columnData: { ...titleProps, 'data-feature': column['data-feature'] },
						});
					} else if (supposedActions[column.key]) {
						Object.assign(cProps, VirtualizedList.cellDictionary.actions);
					} else if (column.type && listCellDictionary[column.type]) {
						Object.assign(cProps, listCellDictionary[column.type], {
							columnData: column.data,
						});
					}
					if (column.hideHeader) {
						cProps.disableSort = true;
						cProps.headerRenderer = HiddenHeader;
					} else if (column.header && listHeaderDictionary[column.header]) {
						let header = listHeaderDictionary[column.header];
						if (typeof header === 'function') {
							header = { headerRenderer: header };
						}
						Object.assign(cProps, header, {
							columnData: column.data,
						});
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
	cellDictionary: PropTypes.object,
	headerDictionary: PropTypes.object,
	itemProps: PropTypes.shape({
		isActive: PropTypes.func,
		isSelected: PropTypes.func,
		onRowClick: PropTypes.func,
		onToggle: PropTypes.func,
		onToggleAll: PropTypes.func,
	}),
	items: PropTypes.arrayOf(PropTypes.object),
	inProgress: PropTypes.bool,
	noRowsRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	rowHeight: PropTypes.number,
	sort: PropTypes.shape({
		onChange: PropTypes.func,
		field: PropTypes.string,
		isDescending: PropTypes.bool,
	}),
	titleProps: PropTypes.shape({
		actionsKey: PropTypes.string,
		key: PropTypes.string,
		onClick: PropTypes.func,
		persistentActionsKey: PropTypes.string,
	}),
	rowRenderers: PropTypes.object,
};
ListToVirtualizedList.defaultProps = {
	displayMode: 'table',
};
HiddenHeader.propTypes = {
	label: PropTypes.string,
};
