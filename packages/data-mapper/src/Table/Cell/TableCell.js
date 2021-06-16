import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function isClickable(props) {
	return props.onClick || props.onDoubleClick || props.onKeyPress;
}

function renderCell(data, className) {
	return <div className={classnames('tc-table-cell', className)}>{data}</div>;
}

function renderClickableCell(data, className, onClick, onDoubleClick, onKeyPress) {
	return (
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		<div
			className={classnames('tc-table-clickable-cell', className)}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onKeyPress={onKeyPress}
			role="button"
			tabIndex="-1"
		>
			{data}
		</div>
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	);
}

/**
 * This component displays a cell of a table as a clickable element. The data must be a string.
 * Callback methods (onClick, onDoubleClick and onKeyPress) must be passed via props.
 */
export default class TableCell extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	onClick(ev) {
		if (this.props.onClick) {
			this.props.onClick(this.props.element, ev);
		}
	}

	onDoubleClick(ev) {
		if (this.props.onDoubleClick) {
			this.props.onDoubleClick(this.props.element, ev);
		}
	}

	onKeyPress(ev) {
		if (this.props.onKeyPress) {
			this.props.onKeyPress(this.props.element, ev);
		}
	}

	render() {
		const { data, className } = this.props;
		if (isClickable(this.props)) {
			return renderClickableCell(
				data,
				className,
				this.onClick,
				this.onDoubleClick,
				this.onKeyPress,
			);
		}
		return renderCell(data, className);
	}
}

TableCell.propTypes = {
	element: PropTypes.object,
	data: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onKeyPress: PropTypes.func,
};
