import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateContext } from '../Context';
import {
	checkSupportedDateFormat,
	checkSupportedTimezone,
	extractDate,
	extractFromDate,
	extractPartsFromTextInput,
} from '../date-extraction';

function ContextualManager(props) {
	function getDateOptions() {
		return {
			dateFormat: props.dateFormat,
			useUTC: props.useUTC,
			required: props.required,
			timezone: props.timezone,
		};
	}

	const initialState = extractDate(props.value, getDateOptions());
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.value !== state.date) {
			const newState = extractDate(props.value, getDateOptions());
			setState(newState);
		}
	}, [props.value]);

	useEffect(() => {
		checkSupportedDateFormat(props.dateFormat);
	}, [props.dateFormat]);

	useEffect(() => {
		if (props.timezone) {
			checkSupportedTimezone(props.timezone);
		}
	}, [props.timezone]);

	function onChange(event, origin, nextState) {
		if (!props.onChange) {
			return;
		}
		const { errorMessage, date, textInput, errors } = nextState;
		props.onChange(event, { errors, errorMessage, date, textInput, origin });
	}

	function onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractPartsFromTextInput(textInput, getDateOptions());
		setState(nextState);
		onChange(event, 'INPUT', nextState);
	}

	function onPickerChange(event, { date }) {
		const nextState = extractFromDate(date, getDateOptions());
		setState(nextState);
		onChange(event, 'PICKER', nextState);
	}

	return (
		<DateContext.Provider
			value={{
				value: {
					textInput: state.textInput,
					date: state.localDate,
				},

				inputManagement: {
					onChange: onInputChange,
					placeholder: props.dateFormat,
				},

				pickerManagement: {
					onSubmit: onPickerChange,
					useUTC: props.useUTC,
				},
			}}
		>
			{props.children}
		</DateContext.Provider>
	);
}

ContextualManager.propTypes = {
	children: PropTypes.node,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	useUTC: PropTypes.bool,
	timezone: PropTypes.string,
};

ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useUTC: false,
};

ContextualManager.displayName = 'Date.Manager';

export default ContextualManager;
