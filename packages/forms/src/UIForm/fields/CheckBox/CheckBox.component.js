import React, { PropTypes } from 'react';
import SimpleCheckBox from './SimpleCheckBox.component';
import FieldTemplate from '../FieldTemplate';

export default function CheckBox(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { description, title } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
		>
			<SimpleCheckBox
				id={id}
				label={title || value}
				onChange={onChange}
				schema={schema}
				value={value}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBox.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			description: PropTypes.string,
			title: PropTypes.string,
		}),
		value: PropTypes.bool,
	};
}

CheckBox.defaultProps = {
	isValid: true,
	schema: {},
	value: false,
};
