import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row, { getRowId } from './Row.js';
import Header from './Header';

/**
 * This function is responsible for rendering an element in the table.
 */
function renderRow(
	element,
	classNameProvider,
	columnKeys,
	rowDataGetter,
	rowRenderer,
	onClick,
	onDoubleClick,
	onEnterRow,
	onLeaveRow,
) {
	return (
		<Row
			key={getRowId(rowDataGetter, element)}
			element={element}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			classNameProvider={classNameProvider}
			columnKeys={columnKeys}
			rowDataGetter={rowDataGetter}
			rowRenderer={rowRenderer}
			onEnterRow={onEnterRow}
			onLeaveRow={onLeaveRow}
		/>
	);
}

function getTableClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForTable) {
		return classNameProvider.getForTable();
	}
	return 'simple-table';
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
	return Header;
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
	withHeader,
	headerRenderer,
	columnKeys,
	updateHeadNodeRef,
) {
	if (withHeader) {
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
	return null;
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
export default class SimpleTable extends Component {
	constructor(props) {
		super(props);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
		this.updateBodyNodeRef = this.updateBodyNodeRef.bind(this);
		this.updateHeadNodeRef = this.updateHeadNodeRef.bind(this);
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

	render() {
		const {
			classNameProvider,
			elements,
			columnKeys,
			rowDataGetter,
			rowRenderer,
			withHeader,
			headerRenderer,
			onScroll,
			onClick,
			onDoubleClick,
			onEnterRow,
			onLeaveRow,
		} = this.props;
		return (
			<div ref={this.updateContentNodeRef} className={`${getTableClassName(classNameProvider)}`}>
				<table ref={this.updateTableNodeRef}>
					{renderHeader(
						classNameProvider,
						rowDataGetter,
						withHeader,
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
								onClick,
								onDoubleClick,
								onEnterRow,
								onLeaveRow,
							),
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

SimpleTable.propTypes = {
	elements: PropTypes.array,
	classNameProvider: PropTypes.object,
	columnKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderer: PropTypes.object,
	withHeader: PropTypes.bool,
	headerRenderer: PropTypes.object,
	onScroll: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
