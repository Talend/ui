import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '../../FieldTemplate';

export default function TextMode(props) {
	const { id, schema, value } = props;
	const { title, type } = schema;

	return (
		<FieldTemplate id={id} label={title}>
			<div>{type === 'password' && value ? '**********' : value}</div>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
