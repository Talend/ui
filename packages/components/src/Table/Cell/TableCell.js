import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function isClickable(extra) {
	return extra && (extra.onClick || extra.onDoubleClick || extra.onKeyPress);
}

function renderCell(data, className) {
	return <div className={classNames('tc-table-cell', className)}>{data}</div>;
}

function renderClickableCell(data, className, onClick, onDoubleClick, onKeyPress) {
	return (
		<div
			className={classNames('tc-table-clickable-cell', className)}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onKeyPress={onKeyPress}
			role="button"
			tabIndex="-1"
		>
			{data}
		</div>
	);
}

/**
 * This component displays a cell of a table as a clickable element. The data must be a string.
 * Callback methods (onClick, onDoubleClick and onKeyPress) must be passed via extra props.
 */
export default class TableCell extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
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
		const { data, className, extra } = this.props;
		if (isClickable(extra)) {
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
	extra: PropTypes.shape({
		onClick: PropTypes.func,
		onDoubleClick: PropTypes.func,
		onKeyPress: PropTypes.func,
	}),
};
