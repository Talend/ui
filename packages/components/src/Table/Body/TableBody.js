import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow, { getRowId } from '../Row/TableRow.js';
import theme from './TableBody.scss';

function getBodyClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForBody) {
		return classNameProvider.getForBody();
	}
	return '';
}

/**
 * This function is responsible for rendering an element in the table.
 */
function renderRow(
	element,
	index,
	classNameProvider,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	onEnterRow,
	onLeaveRow,
) {
	return (
		<TableRow
			key={getRowId(rowDataGetter, element, index)}
			element={element}
			index={index}
			classNameProvider={classNameProvider}
			columnKeys={columnKeys}
			rowDataGetter={rowDataGetter}
			rowRenderer={rowRenderer}
			onEnterRow={onEnterRow}
			onLeaveRow={onLeaveRow}
		/>
	);
}

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default function TableBody({
	elements,
	onScroll,
	classNameProvider,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	onEnterRow,
	onLeaveRow,
}) {
	const classnames = classNames(
		'tc-table-body',
		theme['tc-table-body'],
		getBodyClassName(classNameProvider),
	);
	return (
		<tbody className={classnames} onScroll={onScroll}>
			{elements.map((elem, index) =>
				renderRow(
					elem,
					index,
					classNameProvider,
					columnKeys,
					rowDataGetter,
					rowRenderer,
					onEnterRow,
					onLeaveRow,
				),
			)}
		</tbody>
	);
}

TableBody.propTypes = {
	elements: PropTypes.array.isRequired,
	classNameProvider: PropTypes.shape({
		/**
		 * Return a classname for the table body.
		 */
		getForBody: PropTypes.func,
	}),
	columnKeys: PropTypes.array.isRequired,
	rowDataGetter: PropTypes.object,
	rowRenderer: PropTypes.object,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
