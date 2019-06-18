import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

export default function TextMode(props) {
	const { id, schema, value } = props;

	return (
		<FieldTemplate id={id} label={schema.title}>
			{`${value.operator} ${value.value || ''}`}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
		}),
		value: PropTypes.shape({
			operator: PropTypes.string,
			value: PropTypes.string,
		}),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: {
		operator: '',
		value: '',
	},
};
