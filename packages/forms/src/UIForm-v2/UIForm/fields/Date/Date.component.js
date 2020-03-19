import React, { useState } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { InputDatePicker } from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { convertDate, isoStrToDate } from './Date.utils';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const memorizedIsoStrToDate = memoizeOne(isoStrToDate);

function DateWidget(props) {
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
	const convertedValue =
		schema.schema.format === 'iso-datetime' ? memorizedIsoStrToDate(value) : value;

	const [state, setState] = useState({ errorMessage: '' });

	function onDateChange(event, { errorMessage: nextErrorMessage, date, textInput }) {
		setState({ errorMessage: nextErrorMessage });
		let fieldValue = date;
		if (!nextErrorMessage && date) {
			fieldValue = convertDate(date, textInput, props.schema.schema);
		}

		const payload = {
			schema,
			value: fieldValue,
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
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			<InputDatePicker
				autoFocus={schema.autoFocus}
				dateFormat={options.dateFormat}
				disabled={schema.disabled || valueIsUpdating}
				placeholder={schema.placeholder}
				id={id}
				onChange={onDateChange}
				onBlur={onBlur}
				readOnly={schema.readOnly}
				value={convertedValue}
				useUTC={options.useUTC}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-invalid={!isValid}
				aria-required={schema.required}
				aria-describedby={`${descriptionId} ${errorId}`}
			/>
		</FieldTemplate>
	);
}

DateWidget.displayName = 'Date Widget';
DateWidget.defaultProps = {
	options: {},
};

if (process.env.NODE_ENV !== 'production') {
	DateWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		options: PropTypes.shape({
			dateFormat: PropTypes.string,
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
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
		valueIsUpdating: PropTypes.bool,
	};
}

export default DateWidget;
