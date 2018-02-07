import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SchemaType } from '../../Constants';
import { reverse } from '../../Utils';

function getClassName(props) {
	let className = 'Schema-element';
	if (props.highlighted) {
		className = className + ' highlighted';
	}
	if (props.mapped) {
		className = className + ' mapped';
	}
	if (props.selected) {
		className = className + ' selected';
	}
	className = className + ' ' + props.schemaType;
	return className;
}

export default class SchemaElement extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	select(event) {
		this.props.onSelect(this.props.name, this.props.schemaType);
	}

	render() {
		return (
			<div
				className={reverse(getClassName(this.props), this.props.schemaType === SchemaType.INPUT)}
				onClick={this.select}
			>
				{this.props.name}
			</div>
		);
	}
}

SchemaElement.propTypes = {
	name: PropTypes.string,
};
