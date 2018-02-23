import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultStringCellRenderer({ data }) {
	return <span>{data.value}</span>;
}

DefaultStringCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
