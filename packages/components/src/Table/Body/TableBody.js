import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableRow from '../Row/TableRow.js';
import theme from './TableBody.scss';

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default function TableBody({
	elements,
	columns,
	rowsClassName,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<tbody className={classnames('tc-table-body', theme['tc-table-body'])} onScroll={onScroll}>
			{elements.map(element => (
				<TableRow
					key={element.id}
					element={element}
					rowsClassName={rowsClassName}
					columns={columns}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
				/>
			))}
		</tbody>
	);
}

TableBody.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
