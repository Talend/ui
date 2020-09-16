import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateTimePickers from '@talend/react-components/lib/DateTimePickers';

import { convertDate, isoStrToDate } from './Date.utils';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const InputDateTimePicker = DateTimePickers.InputDateTimePicker;

export default function DateTimeWidget(props) {
	const {
		errorMessage,
		id,
		isValid,
		onChange,
		onFinish,
		options,
		schema,
		value,
		valueIsUpdating,
	} = props;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const convertedValue = schema.schema.format === 'iso-datetime' ? isoStrToDate(value) : value;

	const [state, setState] = useState({ errorMessage: '' });

	function onDateTimeChange(event, { errorMessage: nextErrorMessage, datetime, textInput }) {
		setState({ errorMessage: nextErrorMessage });
		let result = datetime;
		if (!nextErrorMessage && datetime) {
			result = convertDate(datetime, textInput, props.schema.schema);
		} else if (!nextErrorMessage && datetime === null) {
			result = '';
		}

		const payload = {
			schema,
			value: result,
		};
		onChange(event, payload);

		if (!nextErrorMessage) {
			onFinish(event, payload);
		}
	}

	function onBlur(event) {
		onFinish(event, { schema });
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
			required={!!schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			<InputDateTimePicker
				id={id}
				autoFocus={schema.autoFocus}
				disabled={schema.disabled || valueIsUpdating}
				readOnly={schema.readOnly}
				onBlur={onBlur}
				onChange={onDateTimeChange}
				dateFormat={options.dateFormat}
				useSeconds={options.useSeconds}
				useUTC={options.useUTC}
				timezone={options.timezone}
				value={convertedValue}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={!!schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}
DateTimeWidget.displayName = 'DateTimeWidget';
DateTimeWidget.defaultProps = {
	options: {},
};
if (process.env.NODE_ENV !== 'production') {
	DateTimeWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		options: PropTypes.shape({
			dateFormat: PropTypes.string,
			useSeconds: PropTypes.bool,
			timezone: PropTypes.string,
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
				format: PropTypes.string,
			}),
		}),
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
		valueIsUpdating: PropTypes.bool,
	};
}
