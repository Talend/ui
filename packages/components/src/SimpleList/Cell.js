import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a cell as a simple label. The data must be a string.
 */
export default function Cell({ data, className }) {
	return <span className={`comp-cell ${className}`}>{data}</span>;
}

Cell.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};
