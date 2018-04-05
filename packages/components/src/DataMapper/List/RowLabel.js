import React from 'react';
import PropTypes from 'prop-types';

/**
* This component displays a data as a simple label. The data must be a string.
*/
export default function RowLabel({ element, data, className }) {
	return (
		<div
			className={`comp-list-row-data row-label ${className}`}
		>
			{data}
		</div>
	);
}

RowLabel.propTypes = {
	element: PropTypes.object,
	data: PropTypes.string,
	className: PropTypes.string,
};
