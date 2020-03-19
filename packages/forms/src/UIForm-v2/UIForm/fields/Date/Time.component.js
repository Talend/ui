import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputTimePicker } from '@talend/react-components/lib/DateTimePickers';

import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

function TimeWidget({
	errorMessage,
	id,
	isValid,
	options = {},
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
}) {
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	const [state, setState] = useState({ errorMessage: '' });

	function onBlur(event) {
		onFinish(event, { schema });
	}

	function onTimeChange(event, { errorMessage: nextErrorMessage, textInput, time }) {
		setState({ errorMessage: nextErrorMessage });
		const payload = {
			schema,
			value: nextErrorMessage ? null : textInput,
		};
		onChange(event, payload);
		if (!nextErrorMessage && time) {
			onFinish(event, payload);
		}
	}

	return (
		<FieldTemplate
			description={schema.description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={state.errorMessage || errorMessage}
			id={id}
			isValid={isValid}
			label={schema.title}
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			<InputTimePicker
				id={id}
				autoFocus={schema.autoFocus}
				disabled={schema.disabled || valueIsUpdating}
				readOnly={schema.readOnly}
				value={value}
				useSeconds={options.useSeconds}
				onBlur={onBlur}
				onChange={onTimeChange}
			/>
		</FieldTemplate>
	);
}

TimeWidget.displayName = 'TimeWidget';

if (process.env.NODE_ENV !== 'production') {
	TimeWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		options: PropTypes.shape({
			dateFormat: PropTypes.string,
			useUTC: PropTypes.bool,
		}),
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			format: PropTypes.string,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			schema: PropTypes.shape({
				type: PropTypes.string,
			}),
		}),
		value: PropTypes.string,
		valueIsUpdating: PropTypes.bool,
	};
}

export default TimeWidget;
