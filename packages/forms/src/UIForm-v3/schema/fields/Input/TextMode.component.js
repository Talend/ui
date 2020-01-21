import React from 'react';
import PropTypes from 'prop-types';
import InputTextMode from '../../../fields/Input/TextMode.component';

export default function SchemaInput(props) {
	const { schema } = props;
	return <InputTextMode {...props} label={schema.title} type={schema.type} />;
}

if (process.env.NODE_ENV !== 'production') {
	SchemaInput.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string.isRequired,
			type: PropTypes.string,
		}),
	};
}
