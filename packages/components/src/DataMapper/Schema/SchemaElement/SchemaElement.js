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
};
