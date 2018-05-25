import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './Header.scss';
import TableHeaderCell from './TableHeaderCell';

function getHeaderClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForHeader) {
		return classNameProvider.getForHeader();
	}
	return '';
}

function getHeaderCellClassName(classNameProvider, columnKey) {
	if (classNameProvider && classNameProvider.getForHeaderCell) {
		return classNameProvider.getForHeaderCell(columnKey);
	}
	return columnKey;
}

function getHeaderData(rowDataGetter, columnKey) {
	if (rowDataGetter && rowDataGetter.getHeaderData) {
		return rowDataGetter.getHeaderData(columnKey);
	}
	return columnKey;
}

function getHeaderComponent(headerRenderer, columnKey) {
	if (headerRenderer && headerRenderer.getHeaderComponent) {
		return headerRenderer.getHeaderComponent(columnKey);
	}
	return TableHeaderCell;
}

function getHeaderExtraProps(headerRenderer, columnKey) {
	if (headerRenderer && headerRenderer.getExtraProps) {
		return headerRenderer.getExtraProps(columnKey);
	}
	return null;
}

function renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, columnKey) {
	const HeaderComponent = getHeaderComponent(headerRenderer, columnKey);
	const thKey = `th-${columnKey}`;
	return (
		<th key={thKey} className={classNames(thKey, theme.cell)}>
			<HeaderComponent
				key={columnKey}
				data={getHeaderData(rowDataGetter, columnKey)}
				className={getHeaderCellClassName(classNameProvider, columnKey)}
				extra={getHeaderExtraProps(headerRenderer, columnKey)}
			/>
		</th>
	);
}

/**
 * This component displays the header of the table.
 */
export default function TableHeader({
	updateHeadNodeRef,
	columnKeys,
	classNameProvider,
	rowDataGetter,
	headerRenderer,
}) {
	const classnames = classNames(
		'tc-table-header',
		theme.head,
		getHeaderClassName(classNameProvider),
	);
	return (
		<thead ref={updateHeadNodeRef} className={classnames}>
			<tr className={theme.header}>
				{columnKeys.map(col =>
					renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, col),
				)}
			</tr>
		</thead>
	);
}

TableHeader.propTypes = {
	updateHeadNodeRef: PropTypes.func,
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
	headerRenderer: PropTypes.shape({
		getHeaderComponent: PropTypes.func,
		getExtraProps: PropTypes.func,
	}),
};
