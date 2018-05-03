import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';

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
	onEnterElement,
	onLeaveElement,
) {
	return (
		<Row
			key={rowDataGetter.getId(element)}
			element={element}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			classNameProvider={classNameProvider}
			columnKeys={columnKeys}
			rowDataGetter={rowDataGetter}
			rowRenderer={rowRenderer}
			onEnterElement={onEnterElement}
			onLeaveElement={onLeaveElement}
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

function renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, columnKey) {
	const HeaderComponent = headerRenderer.getHeaderComponent(columnKey);
	const data = rowDataGetter.getHeaderData(columnKey);
	const extraProps = headerRenderer.getExtraProps(columnKey);
	const className = getHeaderClassName(classNameProvider, columnKey);
	return (
		<th key={`th-${columnKey}`}>
			<HeaderComponent
				key={columnKey}
				data={data}
				className={className}
				extra={extraProps}
			/>
		</th>
	);
}

function renderHeader(classNameProvider, rowDataGetter, headerRenderer, columnKeys, updateHeadNodeRef) {
	if (headerRenderer) {
		return (
			<thead ref={updateHeadNodeRef}>
				<tr className="tr-head">
					{columnKeys.map(
						col => renderHeaderCell(classNameProvider, rowDataGetter, headerRenderer, col))
					}
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
		this.tableNode = ref
	}

	updateBodyNodeRef(ref) {
		this.bodyNode = ref
	}

	updateHeadNodeRef(ref) {
		this.headNode = ref
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
			headerRenderer,
			onScroll,
			onClick,
			onDoubleClick,
			onEnterElement,
			onLeaveElement,
		} = this.props;
		return (
			<div
				ref={this.updateContentNodeRef}
				className={`${getTableClassName(classNameProvider)}`}
			>
				<table ref={this.updateTableNodeRef} >
					{renderHeader(
						classNameProvider,
						rowDataGetter,
						headerRenderer,
						columnKeys,
						this.updateHeadNodeRef,
					)}
					<tbody
						ref={this.updateBodyNodeRef}
						onScroll={onScroll}
					>
						{elements.map(elem =>
							renderRow(
								elem,
								classNameProvider,
								columnKeys,
								rowDataGetter,
								rowRenderer,
								onClick,
								onDoubleClick,
								onEnterElement,
								onLeaveElement,
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
	headerRenderer: PropTypes.object,
	onScroll: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
};
