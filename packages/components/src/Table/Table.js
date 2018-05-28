import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
import theme from './Table.scss';

function getTableClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForTable) {
		return classNameProvider.getForTable();
	}
	return '';
}

/**
 * This component displays a table of elements.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The columnKeys array provides the column keys. These keys are used to get the element data.
 * The rowRenderer object provides the components used to display the element data.
 * The headerRenderer object provides the components used to display the table header.
 * If the headerRenderer is null or undefined, no header is displayed.
 */
export default function Table({
	classNameProvider,
	elements,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	withHeader,
	headerRenderer,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	const classnames = classNames(
		'tc-table',
		theme['tc-table'],
		getTableClassName(classNameProvider),
	);
	return (
		<div className={classnames}>
			<table
				className={classNames('tc-table-node', theme['tc-table-node'])}
			>
				{withHeader && (
					<TableHeader
						columnKeys={columnKeys}
						classNameProvider={classNameProvider}
						rowDataGetter={rowDataGetter}
						headerRenderer={headerRenderer}
					/>
				)}
				<TableBody
					elements={elements}
					columnKeys={columnKeys}
					classNameProvider={classNameProvider}
					rowDataGetter={rowDataGetter}
					rowRenderer={rowRenderer}
					onScroll={onScroll}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
				/>
			</table>
		</div>
	);
}

Table.propTypes = {
	elements: PropTypes.array.isRequired,
	classNameProvider: PropTypes.shape({
		getForTable: PropTypes.func,
	}),
	columnKeys: PropTypes.array.isRequired,
	rowDataGetter: PropTypes.object,
	rowRenderer: PropTypes.object,
	withHeader: PropTypes.bool,
	headerRenderer: PropTypes.object,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
