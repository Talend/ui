import PropTypes from 'prop-types';
import React from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';
import { getFileName } from '../File.component';

export default function FileTextMode(props) {
	const { id, schema, value } = props;
	const { title, labelProps } = schema;

	return (
		<FieldTemplate id={id} label={title} labelProps={labelProps}>
			{getFileName(value, schema)}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FileTextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			labelProps: PropTypes.object,
			type: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	};
}

FileTextMode.defaultProps = {
	schema: {},
	value: '',
};
