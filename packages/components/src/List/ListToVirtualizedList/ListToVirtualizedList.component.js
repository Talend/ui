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
	const { id, items, columns, titleProps } = props;

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
			id={id}
			collection={items}
			type={(props.displayMode || 'TABLE').toUpperCase()}
			sort={adaptOnSort(props.sort && props.sort.onChange)}
			sortBy={props.sort && props.sort.field}
			sortDirection={props.sort && props.sort.isDescending ? SORT_BY.DESC : SORT_BY.ASC}
		>
			{columns.map((column, index) => {
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
					Object.assign(cProps, CellActions, {
						hideHeader: column.hideHeader || false,
					});
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
	displayMode: PropTypes.oneOf(['large', 'table']),
	titleProps: PropTypes.shape({
		actionsKey: PropTypes.string,
		key: PropTypes.string,
	}),
	items: PropTypes.arrayOf(PropTypes.object),
	columns: PropTypes.arrayOf(PropTypes.object),
	sort: PropTypes.shape({
		onChange: PropTypes.func,
		field: PropTypes.string,
		isDescending: PropTypes.bool,
	}),
};

export default ListToVirtualizedList;
