import React from 'react';
import classNames from 'classnames';
import { Column } from 'react-virtualized';

/**
 * Create new Columns from children, enhanced with
 * - header and row fixed classnames
 * - parent id (via columnData)
 */
export function toColumns(id, theme, children) { // eslint-disable-line import/prefer-default-export
	return React.Children.toArray(children)
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
