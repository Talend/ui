import PropTypes from 'prop-types';
import React from 'react';
import Toggle from '@talend/react-components/lib/Toggle';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

function ToggleWidget(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const { autoFocus, description, disabled = false, title } = schema;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			isValid={isValid}
			required={schema.required}
		>
			<Toggle
				autoFocus={autoFocus}
				checked={value}
				disabled={disabled}
				id={id}
				label={title}
				onBlur={event => onFinish(event, { schema })}
				onChange={event => onChange(event, { schema, value: !value })}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
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
		onFinish: PropTypes.func.isRequired,
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
