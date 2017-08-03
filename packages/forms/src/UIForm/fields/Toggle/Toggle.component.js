import React, { PropTypes } from 'react';
import Toggle from 'react-talend-components/lib/Toggle';
import FieldTemplate from '../FieldTemplate';

function ToggleWidget(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, title } = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			isValid={isValid}
		>
			<Toggle
				autoFocus={autoFocus}
				checked={value}
				disabled={disabled}
				id={id}
				label={title}
				onChange={event => onChange(event, { schema, value: !value })}
			/>
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	ToggleWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.bool,
	};
}

export default ToggleWidget;
