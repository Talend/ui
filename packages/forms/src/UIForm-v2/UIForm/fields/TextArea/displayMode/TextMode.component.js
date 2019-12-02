import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

export default function TextMode({ id, schema, value }) {
	const { rows = 5, title } = schema;

	return (
		<FieldTemplate id={id} label={title}>
			<pre style={{ height: `${rows * 2}rem`, fontSize: 'inherit' }}>{value}</pre>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			rows: PropTypes.number,
			title: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
