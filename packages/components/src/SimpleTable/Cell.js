import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a cell as a simple label. The data must be a string.
 */
export default function Cell({ data, className }) {
	return <div className={`comp-cell ${className}`}>{data}</div>;
}

Cell.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};
