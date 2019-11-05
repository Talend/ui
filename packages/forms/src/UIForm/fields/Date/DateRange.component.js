import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputDatePicker } from '@talend/react-components/lib/DateTimePickers';

import { convertDate, isoStrToDate } from './Date.utils';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export default function DateRangeWidget(props) {
	const {
		errorMessage,
		id,
		isValid,
		onChange,
		onFinish,
		options,
		schema,
		startDate,
		endDate,
		valueIsUpdating,
	} = props;
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);
	const convertedStartDate =
		schema.schema.format === 'iso-datetime' ? isoStrToDate(startDate) : startDate;
	const convertedEndDate =
		schema.schema.format === 'iso-datetime' ? isoStrToDate(endDate) : endDate;

	const [state, setState] = useState({ errorMessage: '' });

	function onDatesChange(
		event,
		{
			errorMessage: nextErrorMessage,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
			textInput,
		},
	) {
		setState({ errorMessage: nextErrorMessage });
		// let result = datetime;
		// if (!nextErrorMessage && datetime) {
		// 	result = convertDate(datetime, textInput, props.schema.schema);
		// }

		const payload = {
			schema,
			value: {
				startDate: selectedStartDate,
				endDate: selectedEndDate,
			},
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
			<InputDatePicker />
			<InputDatePicker />
		</FieldTemplate>
	);
}
DateRangeWidget.displayName = 'DateRangeWidget';
DateRangeWidget.defaultProps = {
	options: {},
};
if (process.env.NODE_ENV !== 'production') {
	DateRangeWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		options: PropTypes.shape({
			dateFormat: PropTypes.string,
			useSeconds: PropTypes.bool,
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
		startDate: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
		valueIsUpdating: PropTypes.bool,
	};
}
