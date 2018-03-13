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
	className += ` ${props.schemaType}`;
	return className;
}

/**
 * A single element of a schema. It is mainly a name with a type (i/o).
 * @author timbault
*/
export default class SchemaElement extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.revealConnection = this.revealConnection.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	componentDidMount() {
		if (this.element != null) {
			this.element.addEventListener('mouseenter', this.handleMouseEnter);
			this.element.addEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	componentWillUnmount() {
		if (this.element != null) {
			this.element.removeEventListener('mouseenter', this.handleMouseEnter);
			this.element.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	handleMouseEnter() {
		this.props.onEnterElement(this.props.name, this.props.schemaType);
	}

	handleMouseLeave() {
		this.props.onLeaveElement(this.props.name, this.props.schemaType);
	}

	select(ev) {
		this.props.onSelect(ev.ctrlKey, this.props.name, this.props.schemaType);
	}

	revealConnection() {
		this.props.revealConnection(this.props.name, this.props.schemaType);
	}

	render() {
		return (
			<div
				className={getClassName(this.props)}
				onClick={this.select}
				onDoubleClick={this.revealConnection}
				role="button"
				ref={elem => {
					this.element = elem;
				}}
			>
				{this.props.name}
			</div>
		);
	}
}

SchemaElement.propTypes = {
	name: PropTypes.string,
	schemaType: PropTypes.string,
	onSelect: PropTypes.func,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	revealConnection: PropTypes.func,
};
