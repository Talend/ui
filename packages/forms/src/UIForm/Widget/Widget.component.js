import React, { PropTypes } from 'react';
import { sfPath } from 'talend-json-schema-form-core';

import widgets from '../utils/widgets';
import { getValue } from '../utils/properties';

export default function Widget({ formName, onChange, properties, schema, validations }) {
	const { key, type, validationMessage } = schema;
	const id = sfPath.name(key, '-', formName);
	const { error, valid } = validations[key] || {};
	const errorMessage = validationMessage || (error && error.message);
	const WidgetImpl = widgets[type];
	return WidgetImpl ?
		(
			<WidgetImpl
				id={id}
				key={id}
				errorMessage={errorMessage}
				formName={formName}
				isValid={valid}
				onChange={onChange}
				properties={properties}
				schema={schema}
				validations={validations}
				value={getValue(properties, key)}
			/>
		) : null;
}

Widget.propTypes = {
	formName: PropTypes.string,
	onChange: PropTypes.func,
	schema: PropTypes.shape({
		key: PropTypes.array,
		type: PropTypes.string.isRequired,
		validationMessage: PropTypes.string,
	}).isRequired,
	properties: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	validations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
