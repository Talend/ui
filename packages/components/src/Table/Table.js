import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableRow, { getRowId } from './TableRow.js';
import TableHeader from './TableHeader';
import FiltersBar from './Filters/FiltersBar';

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

function getMainClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getMain) {
		return classNameProvider.getMain();
	}
	return 'tc-table-container';
}

function getTitleClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForTitle) {
		return classNameProvider.getForTitle();
	}
	return 'tc-table-title';
}

function getFiltersBarClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForFilters) {
		return classNameProvider.getForFilters();
	}
	return 'tc-table-filters';
}

function getTableClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForTable) {
		return classNameProvider.getForTable();
	}
	return 'tc-table';
}

function getHeaderClassName(classNameProvider, columnKey) {
	if (classNameProvider && classNameProvider.getForHeader) {
		return classNameProvider.getForHeader(columnKey);
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
	return TableHeader;
}

function getHeaderExtraProps(headerRenderer, columnKey) {
	if (headerRenderer && headerRenderer.getExtraProps) {
		return headerRenderer.getExtraProps(columnKey);
	}
	return null;
}

function renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, columnKey) {
	const HeaderComponent = getHeaderComponent(headerRenderer, columnKey);
	const data = getHeaderData(rowDataGetter, columnKey);
	const extraProps = getHeaderExtraProps(headerRenderer, columnKey);
	const className = getHeaderClassName(classNameProvider, columnKey);
	return (
		<th key={`th-${columnKey}`}>
			<HeaderComponent key={columnKey} data={data} className={className} extra={extraProps} />
		</th>
	);
}

function renderHeader(
	classNameProvider,
	rowDataGetter,
	headerRenderer,
	columnKeys,
	updateHeadNodeRef,
) {
	return (
		<thead ref={updateHeadNodeRef}>
			<tr className="tr-head">
				{columnKeys.map(col =>
					renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, col),
				)}
			</tr>
		</thead>
	);
}

function displayFilters(filters) {
	return filters && filters.length > 0;
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
export default class Table extends Component {
	constructor(props) {
		super(props);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
		this.updateBodyNodeRef = this.updateBodyNodeRef.bind(this);
		this.updateHeadNodeRef = this.updateHeadNodeRef.bind(this);
	}

	getTableNode() {
		return this.tableNode;
	}

	getHeadNode() {
		return this.headNode;
	}

	getBodyNode() {
		return this.bodyNode;
	}

	getContentNode() {
		return this.contentNode;
	}

	updateTableNodeRef(ref) {
		this.tableNode = ref;
	}

	updateBodyNodeRef(ref) {
		this.bodyNode = ref;
	}

	updateHeadNodeRef(ref) {
		this.headNode = ref;
	}

	updateContentNodeRef(ref) {
		this.contentNode = ref;
	}

	render() {
		const {
			withTitle,
			title,
			classNameProvider,
			elements,
			columnKeys,
			rowDataGetter,
			rowRenderer,
			withHeader,
			headerRenderer,
			filters,
			filtersRenderer,
			onFilterChange,
			onScroll,
			onEnterRow,
			onLeaveRow,
		} = this.props;
		return (
			<div className={getMainClassName(classNameProvider)}>
				{(withTitle || displayFilters(filters)) && (
					<div className="tc-table-title-and-filters">
						{withTitle && <span className={getTitleClassName(classNameProvider)}>{title}</span>}
						{displayFilters(filters) && (
							<FiltersBar
								className={getFiltersBarClassName(classNameProvider)}
								filters={filters}
								filtersRenderer={filtersRenderer}
								onFilterChange={onFilterChange}
							/>
						)}
					</div>
				)}
				<div ref={this.updateContentNodeRef} className={getTableClassName(classNameProvider)}>
					<table ref={this.updateTableNodeRef}>
						{withHeader &&
							renderHeader(
								classNameProvider,
								rowDataGetter,
								headerRenderer,
								columnKeys,
								this.updateHeadNodeRef,
							)}
						<tbody ref={this.updateBodyNodeRef} onScroll={onScroll}>
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
					</table>
				</div>
			</div>
		);
	}
}

Table.propTypes = {
	withTitle: PropTypes.bool,
	title: PropTypes.string,
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
	withHeader: PropTypes.bool,
	headerRenderer: PropTypes.shape({
		getHeaderComponent: PropTypes.func,
		getExtraProps: PropTypes.func,
	}),
	filters: PropTypes.array,
	filtersRenderer: PropTypes.object,
	onFilterChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
