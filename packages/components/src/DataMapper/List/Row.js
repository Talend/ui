import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, key, rowDataGetter, classNameProvider, rowRenderers) {
	const DataComponent = rowRenderers.getComponent(key);
	const data = rowDataGetter.getData(element, key);
	const className = classnames(classNameProvider.get(element, key));
	return (
		<DataComponent
			key={`${rowDataGetter.getId(element)}-${key}`}
			element={element}
			data={data}
			className={className}
		/>
	);
}

/**
 * This component displays the data of an element in a list.
 * A row is divided in columns, each column displaying an element data.
 */
export default class Row extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.updateElementRef = this.updateElementRef.bind(this);
	}

	componentDidMount() {
		if (this.elementRef != null) {
			this.elementRef.addEventListener('mouseenter', this.handleMouseEnter);
			this.elementRef.addEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	componentWillUnmount() {
		if (this.elementRef != null) {
			this.elementRef.removeEventListener('mouseenter', this.handleMouseEnter);
			this.elementRef.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	handleMouseEnter() {
		this.props.onEnterElement(this.props.element);
	}

	handleMouseLeave() {
		this.props.onLeaveElement(this.props.element);
	}

	updateElementRef(ref) {
		this.elementRef = ref;
	}

	render() {
		const {
			element,
			classNameProvider,
			dataKeys,
			rowDataGetter,
			rowRenderers,
			onClick,
			onDoubleClick,
		} = this.props;
		return (
			<div
				className={`comp-list-row ${classnames(classNameProvider.get(element))}`}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				ref={this.updateElementRef}
				data-id={rowDataGetter.getId(element)}
			>
				{dataKeys.map(key =>
					renderRowData(element, key, rowDataGetter, classNameProvider, rowRenderers),
				)}
			</div>
		);
	}
}

Row.propTypes = {
	element: PropTypes.object,
	classNameProvider: PropTypes.object,
	dataKeys: PropTypes.array,
	rowDataGetter: PropTypes.object,
	rowRenderers: PropTypes.object,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
};
