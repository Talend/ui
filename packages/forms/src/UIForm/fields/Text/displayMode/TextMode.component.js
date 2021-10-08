import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

export default function TextMode(props) {
	const { id, schema, value } = props;
	const { title, labelProps, type } = schema;

	return (
		<FieldTemplate id={id} label={title} labelProps={labelProps}>
			{type === 'password' && value ? '**********' : value}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			type: PropTypes.string,
			labelProps: PropTypes.object,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

TextMode.defaultProps = {
	schema: {},
	value: '',
};
