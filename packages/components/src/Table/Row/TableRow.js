import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '../Cell/TableCell';
import theme from './TableRow.scss';

export function getRowId(rowDataGetter, element, index) {
	if (rowDataGetter && rowDataGetter.getElementId) {
		return rowDataGetter.getElementId(element);
	} else if (element.id && typeof element.id === 'string') {
		return element.id;
	}
	return index.toString();
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
function renderRowData(element, index, columnKey, rowDataGetter, classNameProvider, rowRenderer) {
	const CellComponent = getCellComponent(rowRenderer, columnKey);
	const compKey = `${getRowId(rowDataGetter, element, index)}-${columnKey}`;
	const classnames = classNames(`td-${columnKey}`, theme['tc-table-row-cell']);
	const dataClassnames = classNames(
		'tc-table-row-data',
		theme['tc-table-row-data'],
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
		const {
			element,
			index,
			classNameProvider,
			columnKeys,
			rowDataGetter,
			rowRenderer,
		} = this.props;
		const rowKey = getRowId(rowDataGetter, element, index);
		const classnames = classNames(
			'tc-table-row',
			theme['tc-table-row'],
			getRowClassName(classNameProvider, element),
		);
		return (
			<tr key={rowKey} className={classnames} ref={this.updateRowRef} data-id={rowKey}>
				{columnKeys.map(key =>
					renderRowData(element, index, key, rowDataGetter, classNameProvider, rowRenderer),
				)}
			</tr>
		);
	}
}

TableRow.propTypes = {
	element: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	classNameProvider: PropTypes.shape({
		/**
		 * Return a classname for an element of the table
		 * @param {object} element - An element of the table.
		 */
		getForRow: PropTypes.func,
		/**
		 * Return a classname for a data of the given element.
		 * @param {string} columnKey - The key identifying a column.
		 * @param {object} element - An element of the table.
		 */
		getForRowData: PropTypes.func,
	}),
	columnKeys: PropTypes.array.isRequired,
	rowDataGetter: PropTypes.shape({
		/**
		 * Return an unique identifier for the given element.
		 * Each element is displayed in a row.
		 * @param {object} element - An element of the table.
		 */
		getElementId: PropTypes.func,
		/**
		 * Return the data corresponding to the given row and column.
		 * @param {object} row - A row of the table.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getRowData: PropTypes.func,
	}),
	rowRenderer: PropTypes.shape({
		/**
		 * Indicates if a row needs to be updated or not according to the received props.
		 * Default implementation returns true.
		 * @param {object} props - The props of the component rendering a row.
		 */
		needRowUpdate: PropTypes.func,
		/**
		 * Return the component used to render a data for the given column.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getCellComponent: PropTypes.func,
		/**
		 * Return custom properties for the component displaying the data of the given column.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getExtraProps: PropTypes.func,
	}),
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
