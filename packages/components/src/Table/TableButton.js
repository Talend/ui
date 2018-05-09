import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a cell of a table as a button. The data must be a string.
 * Callback methods (onClick and onDoubleClick) must be passed via extra props.
 */
export default class TableButton extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
	}

	onClick() {
		if (this.props.extra && this.props.extra.onClick) {
			this.props.extra.onClick(this.props.element);
		}
	}

	onDoubleClick() {
		if (this.props.extra && this.props.extra.onDoubleClick) {
			this.props.extra.onDoubleClick(this.props.element);
		}
	}

	render() {
		const { data, className } = this.props;
		return (
			<button
				className={`tc-table-button ${className}`}
				onClick={this.onClick}
				onDoubleClick={this.onDoubleClick}
			>
				{data}
			</button>
		);
	}
}

TableButton.propTypes = {
	element: PropTypes.object,
	data: PropTypes.string,
	className: PropTypes.string,
	extra: PropTypes.object,
};
