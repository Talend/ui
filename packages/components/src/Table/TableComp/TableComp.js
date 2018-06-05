import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeader from '../Header/TableHeader';
import TableBody from '../Body/TableBody';
import theme from './TableComp.scss';

export default function TableComp({
	elements,
	columns,
	classnames,
	rowDataGetter,
	withHeader,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<table className={classNames('tc-table', theme['tc-table'], classnames && classnames.table)}>
			{withHeader &&
				<TableHeader columns={columns} classnames={classnames} onSortChange={onSortChange}/>
			}
			<TableBody
				elements={elements}
				columns={columns}
				classnames={classnames}
				rowDataGetter={rowDataGetter}
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
			key: PropTypes.string.isRequired, // column key
			label: PropTypes.string, // label to display
			headClassName: PropTypes.string, // header classname
			headRenderer: PropTypes.func, // header renderer
			headExtraProps: PropTypes.object, // header extra props
			sorter: PropTypes.object,
			cellClassName: PropTypes.string, // cell classname
			cellRenderer: PropTypes.func, // cell renderer
			cellExtraProps: PropTypes.object, // cell extra props
		}),
	).isRequired,
	classnames: PropTypes.shape({
		table: PropTypes.string,
	}),
	rowDataGetter: PropTypes.object,
	withHeader: PropTypes.bool,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
