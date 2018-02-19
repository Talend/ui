import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultDateCellRenderer({ data }) {
	return <span>{data.value}</span>;
}

DefaultDateCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
