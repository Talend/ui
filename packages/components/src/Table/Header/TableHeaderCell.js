import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * This component displays a header cell of a table column as a simple label.
 * The label must be a string.
 * It uses a div element for layout purpose (text alignment in a header).
 */
export default function TableHeaderCell({ label, className }) {
	return <div className={classNames('tc-table-header-cell', className)}>{label}</div>;
}

TableHeaderCell.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
};
