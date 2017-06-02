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
				if (column.key === 'actions') {
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

};

export default ListToVirtualizedList;
