import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputDateTimePicker } from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { isoDateTimeRegExp } from '../../customFormats';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const INVALID_DATE = new Date('');

function isoStrToDate(isoStr) {
	if (isoDateTimeRegExp.test(isoStr)) {
		return new Date(isoStr);
	}
	return INVALID_DATE;
}

function dateToIsoStr(date) {
	return date.toISOString();
}

export default function DateTimeWidget(props) {
	const {
		errorMessage,
		id,
		isValid,
		options,
		schema,
		value,
		valueIsUpdating,
	} = props;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const convertedValue = schema.schema.format === 'iso-datetime' ? isoStrToDate(value) : value;

	const [state, setState] = useState({ errorMessage: '' });

	function onChange(event, { errorMessage: nextErrorMessage, datetime, textInput }) {
		setState({ errorMessage: nextErrorMessage });
		let result = datetime;
		if (!nextErrorMessage && datetime) {
			const { format, type } = props.schema.schema;
			if (format === 'iso-datetime') {
				result = dateToIsoStr(datetime);
			} else if (type === 'number') {
				result = datetime.getTime();
			} else {
				result = textInput;
			}
		}

		const payload = {
			schema,
			value: result,
		};
		props.onChange(event, payload);

		if (!errorMessage) {
			props.onFinish(event, payload);
		}
	}

	function onBlur() {}
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
			<InputDateTimePicker
				autoFocus={schema.autoFocus}
				dateFormat={options.dateFormat}
				disabled={schema.disabled || valueIsUpdating}
				id={id}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={schema.placeholder}
				readOnly={schema.readOnly}
				value={convertedValue}
				useSeconds={options.useSeconds}
				useUTC={options.useUTC}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}
DateTimeWidget.displayName = 'DateTimeWidget';
DateTimeWidget.defaultProps = {
	options: {},
};
DateTimeWidget.propTypes = {
	options: PropTypes.shape({
		useSeconds: PropTypes.bool,
	}),
};
