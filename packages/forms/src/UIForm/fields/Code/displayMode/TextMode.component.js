/* eslint-disable import/no-mutable-exports */
import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

function TextModeCode({ id, schema, value, options }) {
	return (
		<FieldTemplate id={id} label={schema.title}>
			<pre style={options}>{value}</pre>
		</FieldTemplate>
	);
}
if (process.env.NODE_ENV !== 'production') {
	TextModeCode.propTypes = {
		id: PropTypes.string,
		options: PropTypes.object,
		schema: PropTypes.shape({
			title: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextModeCode.defaultProps = {
	schema: {},
};

export default TextModeCode;
