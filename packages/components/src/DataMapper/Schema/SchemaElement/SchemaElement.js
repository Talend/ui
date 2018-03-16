import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Returns the className of the schema element depending of its props.
 * @param {object} props - The props of the schema element.
 */
function getClassName(props) {
	let className = 'schema-element';
	if (props.highlighted) {
		className += ' highlighted';
	}
	if (props.mapped) {
		className += ' mapped';
	}
	if (props.selected) {
		className += ' selected';
	}
	className += ` ${props.side}`;
	return className;
}

/**
 * A single element of a schema. It is mainly a name with a side (i/o).
 * @author timbault
 */
export default class SchemaElement extends Component {

	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.revealConnection = this.revealConnection.bind(this);
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
		this.props.onEnterElement(this.props.element, this.props.side);
	}

	handleMouseLeave() {
		this.props.onLeaveElement(this.props.element, this.props.side);
	}

	select(ev) {
		this.props.onSelect(ev.ctrlKey, this.props.element, this.props.side);
	}

	revealConnection() {
		this.props.revealConnection(this.props.element, this.props.side);
	}

	updateElementRef(ref) {
		this.elementRef = ref;
	}

	render() {
		return (
			<div
				className={getClassName(this.props)}
				onClick={this.select}
				onDoubleClick={this.revealConnection}
				role="button"
				ref={this.updateElementRef}
			>
				{this.props.dataAccessor.getElementName(this.props.element)}
			</div>
		);
	}
}

SchemaElement.propTypes = {
	dataAccessor: PropTypes.object,
	element: PropTypes.any.isRequired,
	side: PropTypes.string,
	onSelect: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	revealConnection: PropTypes.func,
};
