import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './TableHeader.scss';
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
	const dataClassnames = classNames(
		'tc-table-header-data',
		theme['tc-table-header-data'],
		getHeaderCellClassName(classNameProvider, columnKey),
	);
	return (
		<th key={thKey} className={classNames(thKey, theme['tc-table-header-cell'])}>
			<HeaderComponent
				key={columnKey}
				data={getHeaderData(rowDataGetter, columnKey)}
				className={dataClassnames}
				extra={getHeaderExtraProps(headerRenderer, columnKey)}
			/>
		</th>
	);
}

/**
 * This component displays the header of the table.
 */
export default function TableHeader({
	columnKeys,
	classNameProvider,
	rowDataGetter,
	headerRenderer,
}) {
	const classnames = classNames(
		'tc-table-header',
		theme['tc-table-header'],
		getHeaderClassName(classNameProvider),
	);
	return (
		<thead className={classnames}>
			<tr className={theme['tc-table-header-row']}>
				{columnKeys.map(col =>
					renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, col),
				)}
			</tr>
		</thead>
	);
}

TableHeader.propTypes = {
	classNameProvider: PropTypes.shape({
		/*
		 * Return a classname for the table header.
		 */
		getForHeader: PropTypes.func,
		/**
		 * Returns a classname for the header cell of the given column
		 * @param {string} columnKey - The key identifying a column.
		 */
		getForHeaderCell: PropTypes.func,
	}),
	columnKeys: PropTypes.array.isRequired,
	rowDataGetter: PropTypes.shape({
		/**
		 * Return the header data corresponding to the given column.
		 * This data will be used to render the header.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getHeaderData: PropTypes.func,
	}),
	headerRenderer: PropTypes.shape({
		/**
		 * Return the component used to render a header for the given column.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getHeaderComponent: PropTypes.func,
		/**
		 * Return extra properties for the header component rendering the given column header.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getExtraProps: PropTypes.func,
	}),
};
