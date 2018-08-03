import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import VirtualizedList, { SORT_BY, cellDictionary, headerDictionary } from '../../VirtualizedList';
import { cellType as titleCellType } from '../../VirtualizedList/CellTitle';
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
	const titleProps = props.titleProps || {
		key: props.titleKey,
		iconKey: props.titleIconKey,
		displayModeKey: props.titleDisplayModeKey,
		actionsKey: props.titleActionsKey,
		persistentActionsKey: props.titlePersistentActionsKey,
		onClick: props.onTitleClick,
		onEditCancel: props.onTitleEditCancel,
		onEditSubmit: props.onTitleEditSubmit,
	};

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
	const isActive = props.isActive || get(props, 'itemProps.isActive');
	const isSelected = props.isSelected || get(props, 'itemProps.isSelected');
	const onRowClick = props.onRowClick || get(props, 'itemProps.onRowClick');
	const onToggle = props.onToggle || get(props, 'itemProps.onToggle'); // sic
	const onTitleClick = props.onTitleClick || get(props, 'titleProps.onClick');
	const sort = props.sort || {
		onChange: props.onSortChange,
		field: props.sortOn,
		isDescending: props.sortIsDescending,
	};

	// Allow to override or add new cell renderer from outside
	const listCellDictionary = { ...cellDictionary, ...props.cellDictionary };
	const listHeaderDictionary = { ...headerDictionary, ...props.headerDictionary };

	return (
		<VirtualizedList
			id={props.id}
			collection={props.items}
			isActive={isActive}
			isSelected={isSelected}
			inProgress={props.inProgress}
			onRowClick={onRowClick}
			onRowDoubleClick={onTitleClick}
			defaultHeight={props.defaultHeight}
			noRowsRenderer={props.noRowsRenderer}
			rowHeight={props.rowHeight}
			selectionToggle={onToggle}
			sort={adaptOnSort(sort && sort.onChange)}
			sortBy={sort && sort.field}
			sortDirection={sort && sort.isDescending ? SORT_BY.DESC : SORT_BY.ASC}
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
					};
					if (titleProps && column.key === titleProps.key) {
						Object.assign(cProps, listCellDictionary[titleCellType], {
							columnData: titleProps,
						});
					} else if (supposedActions[column.key]) {
						Object.assign(cProps, CellActions);
					} else if (column.type && listCellDictionary[column.type]) {
						Object.assign(cProps, listCellDictionary[column.type], {
							columnData: column.data,
						});
					}
					if (column.hideHeader) {
						cProps.disableSort = true;
						cProps.headerRenderer = HiddenHeader;
					} else if (column.header && listHeaderDictionary[column.header]) {
						Object.assign(cProps, listHeaderDictionary[column.header], {
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
	isActive: PropTypes.func,
	isSelected: PropTypes.func,
	onRowClick: PropTypes.func,
	onToggle: PropTypes.func,
	cellDictionary: PropTypes.object,
	headerDictionary: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.object),
	inProgress: PropTypes.bool,
	noRowsRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	rowHeight: PropTypes.number,
	titleProps: PropTypes.object,
	sort: PropTypes.object,
	sortOn: PropTypes.string,
	onSortChange: PropTypes.func,
	sortIsDescending: PropTypes.bool,
	titleActionsKey: PropTypes.string,
	titleDisplayModeKey: PropTypes.string,
	titleIconKey: PropTypes.string,
	titleKey: PropTypes.string,
	titlePersistentActionsKey: PropTypes.string,
	onTitleEditSubmit: PropTypes.func,
	onTitleEditCancel: PropTypes.func,
	onTitleClick: PropTypes.func,
};
ListToVirtualizedList.defaultProps = {
	displayMode: 'table',
};
HiddenHeader.propTypes = {
	label: PropTypes.string,
};
