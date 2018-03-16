import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultDateRenderer({ data }) {
	let value = data.value;
	if (typeof value === 'number') {
		const date = new Date(value);
		value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}
	return <span>{value}</span>;
}

DefaultDateRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.number,
	}),
};
