import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';

/**
 * This function is responsible for rendering an element in the list.
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

function getListClassName(classNameProvider) {
	if (classNameProvider && classNameProvider.getForList) {
		return classNameProvider.getForList();
	}
	return 'simple-list';
}

function getColumnClassName(classNameProvider, columnKey) {
	if (classNameProvider && classNameProvider.getForColumn) {
		return classNameProvider.getForColumn(columnKey);
	}
	return columnKey;
}

function renderCol(classNameProvider, col) {
	return <col className={getColumnClassName(classNameProvider, col)} />;
}

function renderColGroup(classNameProvider, columnKeys) {
	return (
		<colgroup>
			{columnKeys.map(col => renderCol(classNameProvider, col))}
		</colgroup>
	);
}

/**
 * This component displays a list of elements.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The columnKeys array provides the column keys. These keys are used to get the element data.
 * The rowRenderer object provides the components used to display the element data.
 */
export default class SimpleList extends Component {

	constructor(props) {
		super(props);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
		this.updateContentNodeRef = this.updateContentNodeRef.bind(this);
		this.updateBodyNodeRef = this.updateBodyNodeRef.bind(this);
	}

	updateTableNodeRef(ref) {
		this.tableNode = ref
	}

	updateBodyNodeRef(ref) {
		this.bodyNode = ref
	}

	updateContentNodeRef(ref) {
		this.contentNode = ref;
	}

	getTableNode() {
		return this.tableNode;
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
			onScroll,
			onClick,
			onDoubleClick,
			onEnterElement,
			onLeaveElement,
		} = this.props;
		return (
			<div
				ref={this.updateContentNodeRef}
				className={`${getListClassName(classNameProvider)}`}
				onScroll={onScroll}
			>
				<table ref={this.updateTableNodeRef} >
					{renderColGroup(classNameProvider, columnKeys)}
					<tbody ref={this.updateBodyNodeRef} >
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

SimpleList.propTypes = {
	elements: PropTypes.array,
	classNameProvider: PropTypes.object,
	columnKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderer: PropTypes.object,
	onScroll: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
};
