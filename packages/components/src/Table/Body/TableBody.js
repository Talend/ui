import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow, { getRowId } from '../Row/TableRow.js';
import theme from './Body.scss';

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
	classNameProvider,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	onEnterRow,
	onLeaveRow,
) {
	return (
		<TableRow
			key={getRowId(rowDataGetter, element)}
			element={element}
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
	updateBodyNodeRef,
	elements,
	onScroll,
	classNameProvider,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	onEnterRow,
	onLeaveRow,
}) {
	const classnames = classNames('tc-table-body', theme.body, getBodyClassName(classNameProvider));
	return (
		<tbody ref={updateBodyNodeRef} className={classnames} onScroll={onScroll}>
			{elements.map(elem =>
				renderRow(
					elem,
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
	elements: PropTypes.array,
	classNameProvider: PropTypes.shape({
		getForTable: PropTypes.func,
		getForHeader: PropTypes.func,
		getForRow: PropTypes.func,
		getForRowData: PropTypes.func,
	}),
	columnKeys: PropTypes.array,
	rowDataGetter: PropTypes.shape({
		getElementId: PropTypes.func,
		getHeaderData: PropTypes.func,
		getRowData: PropTypes.func,
	}),
	rowRenderer: PropTypes.shape({
		needRowUpdate: PropTypes.func,
		getCellComponent: PropTypes.func,
		getExtraProps: PropTypes.func,
	}),
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	updateBodyNodeRef: PropTypes.func,
};
