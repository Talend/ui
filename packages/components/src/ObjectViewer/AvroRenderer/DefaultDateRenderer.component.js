import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultDateRenderer({ data }) {
	if (typeof data.value === 'number') {
		const date = new Date(data.value);
		return <span>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>;
	}
	return <span>{data.value}</span>;
}

DefaultDateRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.number,
	}),
};
