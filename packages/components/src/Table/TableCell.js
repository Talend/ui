import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a cell of a table as a simple label. The data must be a string.
 * It uses a div element for layout purpose (text alignment in a cell).
 */
export default function TableCell({ data, className }) {
	return (
		<div
			className={`tc-table-cell ${className}`}
		>
			{data}
		</div>
	);
}

TableCell.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};
