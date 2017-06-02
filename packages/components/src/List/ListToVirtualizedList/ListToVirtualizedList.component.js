import React, { PropTypes } from 'react';
import VirtualizedList from '../../VirtualizedList';
import CellTitle from '../../VirtualizedList/CellTitle';
import CellActions from '../../VirtualizedList/CellActions';

function ListToVirtualizedList(props) {
	debugger;
	// props.columns == [{key, label}]
	// props.itemProps
	const { id, items, columns, titleProps } = props;
	if (!titleProps.actionsKey) {
		titleProps.actionsKey = 'actions';
	}
	// Backward compatibility: find array in object attr:
	const supposedActions = {};
	if (props.items.length > 0) {
		const item = props.items[0];
		Object.keys(item).forEach((key) => {
			if (Array.isArray(item[key])) {
				supposedActions[key] = true;
			}
		});
	}
	return (
		<VirtualizedList
			id={id}
			collection={items}
			type={(props.displayMode || 'TABLE').toUpperCase()}
		>
			{columns.map((column) => {
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
					<VirtualizedList.Content {...cProps} />
				);
			})}
		</VirtualizedList>
	);
}

ListToVirtualizedList.propTypes = {
	id: PropTypes.string,
	displayMode: PropTypes.oneOf('LARGE', 'TABLE'),
	titleProps: PropTypes.shape({
		actionsKey: PropTypes.string,
		key: PropTypes.string,
	}),
	items: PropTypes.arrayOf(PropTypes.object),
	display: PropTypes.string,
	columns: PropTypes.arrayOf(PropTypes.object),
};

export default ListToVirtualizedList;
