import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getRowDataClassName(classNameProvider, element, columnKey) {
	if (classNameProvider && classNameProvider.getForRowData) {
		return classNameProvider.getForRowData(element, columnKey);
	}
	return `simple-table-row-data-${columnKey}`;
}

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, columnKey, rowDataGetter, classNameProvider, rowRenderer) {
	const CellComponent = rowRenderer.getCellComponent(columnKey);
	const data = rowDataGetter.getRowData(element, columnKey);
	const className = getRowDataClassName(classNameProvider, element, columnKey);
	const extraProps = rowRenderer.getExtraProps(columnKey);
	const compKey = `${rowDataGetter.getId(element)}-${columnKey}`;
	return (
		<td key={`td-${compKey}`}>
			<CellComponent
				key={compKey}
				element={element}
				data={data}
				className={className}
				extra={extraProps}
			/>
		</td>
	);
}

function getRowClassName(classNameProvider, element) {
	if (classNameProvider && classNameProvider.getForRow) {
		return classNameProvider.getForRow(element);
	}
	return 'simple-table-row';
}

/**
 * This component displays the data of an element in a table.
 * A row is divided in columns, each column displaying an element data.
 */
export default class Row extends Component {
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
		return this.props.rowRenderer.needRowUpdate(nextProps);
	}

	componentWillUnmount() {
		if (this.rowRef != null) {
			this.rowRef.removeEventListener('mouseenter', this.handleMouseEnter);
			this.rowRef.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	handleMouseEnter() {
		this.props.onEnterRow(this.props.element);
	}

	handleMouseLeave() {
		this.props.onLeaveRow(this.props.element);
	}

	updateRowRef(ref) {
		this.rowRef = ref;
	}

	render() {
		const {
			element,
			classNameProvider,
			columnKeys,
			rowDataGetter,
			rowRenderer,
			onClick,
			onDoubleClick,
		} = this.props;
		const rowKey = rowDataGetter.getId(element);
		return (
			<tr
				key={rowKey}
				className={`tr-body ${getRowClassName(classNameProvider, element)}`}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				ref={this.updateRowRef}
				data-id={rowKey}
			>
				{columnKeys.map(key =>
					renderRowData(element, key, rowDataGetter, classNameProvider, rowRenderer),
				)}
			</tr>
		);
	}
}

Row.propTypes = {
	element: PropTypes.object,
	classNameProvider: PropTypes.object,
	columnKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderer: PropTypes.object,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
