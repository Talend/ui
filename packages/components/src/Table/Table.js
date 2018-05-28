import React, { Component } from 'react';
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
		} = this.props;
		const classnames = classNames('tc-table', theme['tc-table'], getTableClassName(classNameProvider));
		return (
			<div ref={this.updateContentNodeRef} className={classnames}>
				<table ref={this.updateTableNodeRef}>
					{withHeader && (
						<TableHeader
							updateHeadNodeRef={this.updateHeadNodeRef}
							columnKeys={columnKeys}
							classNameProvider={classNameProvider}
							rowDataGetter={rowDataGetter}
							headerRenderer={headerRenderer}
						/>
					)}
					<TableBody
						updateBodyNodeRef={this.updateBodyNodeRef}
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
}

Table.propTypes = {
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
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
