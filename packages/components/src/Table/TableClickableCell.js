import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a cell of a table as a clickable element. The data must be a string.
 * Callback methods (onClick, onDoubleClick and onKeyPress) must be passed via extra props.
 */
export default class TableClickableCell extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
	}

	onClick(ev) {
		if (this.props.extra && this.props.extra.onClick) {
			this.props.extra.onClick(this.props.element, ev);
		}
	}

	onDoubleClick(ev) {
		if (this.props.extra && this.props.extra.onDoubleClick) {
			this.props.extra.onDoubleClick(this.props.element, ev);
		}
	}

	onKeyPress(ev) {
		if (this.props.extra && this.props.extra.onKeyPress) {
			this.props.extra.onKeyPress(this.props.element, ev);
		}
	}

	render() {
		const { data, className } = this.props;
		return (
			<div
				className={`tc-table-clickable-cell ${className}`}
				onClick={this.onClick}
				onDoubleClick={this.onDoubleClick}
				onKeyPress={this.onKeyPress}
				role="button"
				tabIndex="-1"
			>
				{data}
			</div>
		);
	}
}

TableClickableCell.propTypes = {
	element: PropTypes.object,
	data: PropTypes.string,
	className: PropTypes.string,
	extra: PropTypes.object,
};
