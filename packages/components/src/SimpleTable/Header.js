import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a header of a table column as a simple label.
 * The data must be a string.
 */
export default function Header({ data, className }) {
	return <div className={`comp-header ${className}`}>{data}</div>;
}

Header.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
};
