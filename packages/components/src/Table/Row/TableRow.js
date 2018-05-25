import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '../Cell/TableCell';
import theme from './Row.scss';

export function getRowId(rowDataGetter, element) {
	if (rowDataGetter && rowDataGetter.getElementId) {
		return rowDataGetter.getElementId(element);
	} else if (element.id && typeof element.id === 'string') {
		return element.id;
	}
	return 'undefined-id';
}

function getRowDataClassName(classNameProvider, element, columnKey) {
	if (classNameProvider && classNameProvider.getForRowData) {
		return classNameProvider.getForRowData(columnKey, element);
	}
	return `tc-table-row-data-${columnKey}`;
}

function getCellComponent(rowRenderer, columnKey) {
	if (rowRenderer && rowRenderer.getCellComponent) {
		return rowRenderer.getCellComponent(columnKey);
	}
	return TableCell;
}

function getCellComponentExtraProps(rowRenderer, columnKey) {
	if (rowRenderer && rowRenderer.getExtraProps) {
		return rowRenderer.getExtraProps(columnKey);
	}
	return null;
}

function getRowData(rowDataGetter, element, columnKey) {
	if (rowDataGetter && rowDataGetter.getRowData) {
		return rowDataGetter.getRowData(element, columnKey);
	} else if (element && element[columnKey]) {
		return element[columnKey];
	}
	return null;
}

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, columnKey, rowDataGetter, classNameProvider, rowRenderer) {
	const CellComponent = getCellComponent(rowRenderer, columnKey);
	const compKey = `${getRowId(rowDataGetter, element)}-${columnKey}`;
	const classnames = classNames(`td-${columnKey}`, theme.cell);
	const dataClassnames = classNames(
		'tc-table-row-data',
		theme.data,
		getRowDataClassName(classNameProvider, element, columnKey),
	);
	return (
		<td key={`td-${compKey}`} className={classnames}>
			<CellComponent
				key={compKey}
				element={element}
				data={getRowData(rowDataGetter, element, columnKey)}
				className={dataClassnames}
				extra={getCellComponentExtraProps(rowRenderer, columnKey)}
			/>
		</td>
	);
}

function getRowClassName(classNameProvider, element) {
	if (classNameProvider && classNameProvider.getForRow) {
		return classNameProvider.getForRow(element);
	}
	return '';
}

/**
 * This component displays the data of an element in a table.
 * A row is divided in columns, each column displaying an element data.
 */
export default class TableRow extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.updateRowRef = this.updateRowRef.bind(this);
	}

	componentDidMount() {
		if (this.rowRef != null) {
			this.rowRef.addEventListener('mouseenter', this.handleMouseEnter);
			this.rowRef.addEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.rowRenderer && this.props.rowRenderer.needRowUpdate) {
			return this.props.rowRenderer.needRowUpdate(nextProps);
		}
		return true;
	}

	componentWillUnmount() {
		if (this.rowRef != null) {
			this.rowRef.removeEventListener('mouseenter', this.handleMouseEnter);
			this.rowRef.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	handleMouseEnter() {
		if (this.props.onEnterRow) {
			this.props.onEnterRow(this.props.element);
		}
	}

	handleMouseLeave() {
		if (this.props.onLeaveRow) {
			this.props.onLeaveRow(this.props.element);
		}
	}

	updateRowRef(ref) {
		this.rowRef = ref;
	}

	render() {
		const { element, classNameProvider, columnKeys, rowDataGetter, rowRenderer } = this.props;
		const rowKey = getRowId(rowDataGetter, element);
		const classnames = classNames(
			'tc-table-row',
			theme.row,
			getRowClassName(classNameProvider, element),
		);
		return (
			<tr key={rowKey} className={classnames} ref={this.updateRowRef} data-id={rowKey}>
				{columnKeys.map(key =>
					renderRowData(element, key, rowDataGetter, classNameProvider, rowRenderer),
				)}
			</tr>
		);
	}
}

TableRow.propTypes = {
	element: PropTypes.object,
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
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
