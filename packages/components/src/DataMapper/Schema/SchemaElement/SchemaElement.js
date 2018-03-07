import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class SchemaElement extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	handleMouseEnter(ev) {
		//console.log('on mouse enter ' + this.props.name);
		this.props.onEnterElement(this.props.name, this.props.schemaType);
	}

	handleMouseLeave(ev) {
		//console.log('on mouse leave ' + this.props.name);
		this.props.onLeaveElement(this.props.name, this.props.schemaType);
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

	select() {
		this.props.onSelect(this.props.name, this.props.schemaType);
	}

	render() {
		return (
			<div
				className={getClassName(this.props)}
				onClick={this.select}
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
};
