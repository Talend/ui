import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow, { getRowId } from '../Row/TableRow.js';
import theme from './TableBody.scss';

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default function TableBody({
	elements,
	columns,
	classnames,
	rowDataGetter,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	const bodyClassnames = classNames(
		'tc-table-body',
		theme['tc-table-body'],
		classnames && classnames.body,
	);
	return (
		<tbody className={bodyClassnames} onScroll={onScroll}>
			{elements.map((element, index) => (
				<TableRow
					key={getRowId(rowDataGetter, element, index)}
					element={element}
					index={index}
					classnames={classnames}
					columns={columns}
					rowDataGetter={rowDataGetter}
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
	classnames: PropTypes.shape({
		body: PropTypes.string,
	}),
	rowDataGetter: PropTypes.object,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
