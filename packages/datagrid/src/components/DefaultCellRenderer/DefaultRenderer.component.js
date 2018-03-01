import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultRenderer({ data }) {
	return <span>{data.value}</span>;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
