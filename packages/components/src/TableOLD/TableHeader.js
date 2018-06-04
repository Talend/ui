import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a header of a table column as a simple label.
 * The data must be a string.
 * It uses a div element for layout purpose (text alignment in a header).
 */
export default function TableHeader({ data, className }) {
	return <div className={`tc-table-header ${className}`}>{data}</div>;
}

TableHeader.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};
