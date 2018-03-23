import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function renderRowData(element, key, data, classNameProvider) {
	return (
		<div className={`comp-list-row-data ${classnames(classNameProvider.get(element, key))}`}>
			{data}
		</div>
	);
}

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
			onClick,
			onDoubleClick,
		} = this.props;
		return (
			<div
				className={`comp-list-row ${classnames(classNameProvider.get(element))}`}
				onClick={onClick}
				onDoubleClick={onDoubleClick}
				ref={this.updateElementRef}
				data-id={rowDataGetter.getData(element, 'id')}
			>
				{dataKeys.map(key =>
					renderRowData(element, key, rowDataGetter.getData(element, key), classNameProvider),
				)}
			</div>
		);
	}
}

Row.propTypes = {
	element: PropTypes.object,
	classNameProvider: PropTypes.func,
	dataKeys: PropTypes.array,
	rowDataGetter: PropTypes.func,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
};
