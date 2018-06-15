import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeader from '../Header/TableHeader';
import TableBody from '../Body/TableBody';
import theme from './TableComp.scss';

/**
 * This component is responsible for rendering the table (i.e. head and body)
 */
export default function TableComp({
	elements,
	columns,
	classnames,
	withHeader,
	sorters,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<table className={classNames('tc-table', theme['tc-table'], classnames && classnames.table)}>
			{withHeader && (
				<TableHeader
					columns={columns}
					classnames={classnames}
					sorters={sorters}
					onSortChange={onSortChange}
				/>
			)}
			<TableBody
				elements={elements}
				columns={columns}
				classnames={classnames}
				onScroll={onScroll}
				onEnterRow={onEnterRow}
				onLeaveRow={onLeaveRow}
			/>
		</table>
	);
}

TableComp.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string,
			headClassName: PropTypes.string,
			headRenderer: PropTypes.func,
			headExtraProps: PropTypes.object,
			cellClassName: PropTypes.string,
			cellRenderer: PropTypes.func,
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	classnames: PropTypes.shape({
		table: PropTypes.string,
	}),
	withHeader: PropTypes.bool,
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
