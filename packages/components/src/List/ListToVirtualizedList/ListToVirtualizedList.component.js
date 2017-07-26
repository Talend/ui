import React, { PropTypes } from 'react';
import VirtualizedList, { SORT_BY } from '../../VirtualizedList';
import CellTitle from '../../VirtualizedList/CellTitle';
import CellActions from '../../VirtualizedList/CellActions';

function adaptOnSort(onChange) {
	if (!onChange) {
		return null;
	}
	return function onSortChange({ sortBy, sortDirection }) {
		return onChange(
			null,
			{ field: sortBy, isDescending: sortDirection === SORT_BY.DESC }
		);
	};
}

function ListToVirtualizedList(props) {
	const {
		isActive,
		itemProps,
		onRowClick,
		sort,
		titleProps,
	} = props;

	if (!titleProps.actionsKey) {
		titleProps.actionsKey = 'actions';
	}
	// Backward compatibility: find array in object attr:
	const supposedActions = {};
	if (props.items.length > 0) {
		const item = props.items[0];
		Object.keys(item)
			.filter(key => Array.isArray(item[key]))
			.forEach((key) => { supposedActions[key] = true; });
	}
	return (
		<VirtualizedList
			id={props.id}
			collection={props.items}
			isActive={isActive}
			isSelected={itemProps && itemProps.isSelected}
			onRowClick={onRowClick}
			selectionToggle={itemProps && itemProps.onToggle}
			sort={adaptOnSort(sort && sort.onChange)}
			sortBy={sort && sort.field}
			sortDirection={sort && sort.isDescending ? SORT_BY.DESC : SORT_BY.ASC}
			type={props.displayMode.toUpperCase()}
		>
			{props.columns.map((column, index) => {
				const cProps = {
					label: column.label,
					dataKey: column.key,
				};
				if (column.key === titleProps.key) {
					Object.assign(cProps, CellTitle, {
						columnData: titleProps,
					});
				}
				if (supposedActions[column.key]) {
					Object.assign(cProps, CellActions);
				}
				return (
					<VirtualizedList.Content key={index} {...cProps} />
				);
			})}
		</VirtualizedList>
	);
}

ListToVirtualizedList.propTypes = {
	id: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
	displayMode: PropTypes.oneOf(['large', 'table']),
	isActive: PropTypes.func,
	itemProps: PropTypes.shape({
		isSelected: PropTypes.func,
		onToggle: PropTypes.func,
	}),
	items: PropTypes.arrayOf(PropTypes.object),
	onRowClick: PropTypes.func,
	sort: PropTypes.shape({
		onChange: PropTypes.func,
		field: PropTypes.string,
		isDescending: PropTypes.bool,
	}),
	titleProps: PropTypes.shape({
		actionsKey: PropTypes.string,
		key: PropTypes.string,
	}),
};
ListToVirtualizedList.defaultProps = {
	displayMode: 'table',
};

export default ListToVirtualizedList;
