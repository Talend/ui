import React from 'react';
import classNames from 'classnames';
import { Column } from 'react-virtualized';

import CellCheckboxRenderer from '../CellCheckbox';

/**
 * Insert a checkbox column configuration to select a row.
 */
export function insertSelectionConfiguration({ children, isSelected, selectionToggle }) {
	let contentsConfiguration = React.Children.toArray(children);
	if (selectionToggle) {
		const toggleColumn = (
			<Column
				label={''}
				dataKey={''}
				disableSort
				width={35}
				flexShrink={0}
				flexGrow={0}
				cellDataGetter={({ rowData }) => isSelected(rowData)}
				columnData={{ label: 'Select this element', onChange: selectionToggle }}
				{...CellCheckboxRenderer}
			/>);
		contentsConfiguration = [toggleColumn].concat(contentsConfiguration);
	}
	return contentsConfiguration;
}

/**
 * Create new Columns from children, enhanced with
 * - header and row fixed classnames
 * - parent id (via columnData)
 */
export function toColumns(id, theme, contentConfigurations) {
	return contentConfigurations
		.map((field, index) => {
			const colProps = {
				...field.props,
				headerClassName: classNames(
					field.props.headerClassName,
					theme.header,
				),
				className: classNames(
					field.props.className,
					theme.cell,
				),
				columnData: {
					...field.props.columnData,
					id,
				},
			};
			return <Column key={index} {...colProps} />;
		});
}
