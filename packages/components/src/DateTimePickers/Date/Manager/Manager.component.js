import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { DateContext } from '../Context';
import {
	checkSupportedDateFormat,
	extractDate,
	extractPartsFromDate,
	extractDateFromTextInput,
} from '../date-extraction';

import { INPUT_ERRORS } from '../constants';

function ContextualManager(props) {
	// eslint-disable-next-line no-use-before-define
	const initialState = extractDate(props.value, getDateOptions());
	const [state, setState] = useState(initialState);

	function getDateOptions() {
		return {
			dateFormat: props.dateFormat,
			useUTC: props.useUTC,
			required: props.required,
		};
	}
	function onChange(event, origin, nextState) {
		if (!props.onChange) {
			return;
		}
		const { errorMessage, date, textInput, errors } = nextState;
		props.onChange(event, { errors, errorMessage, date, textInput, origin });
	}

	function onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractDateFromTextInput(textInput, getDateOptions());
		setState(nextState);
		onChange(event, 'INPUT', nextState);
	}

	function onPickerChange(event, { date }) {
		const nextState = extractPartsFromDate(date, getDateOptions());

		const nextErrors = state.errors
			.filter(error => !INPUT_ERRORS.includes(error.code))
			.concat(nextState.errors.filter(error => INPUT_ERRORS.includes(error.code)));

		setState({ ...nextState, errors: nextErrors });
		onChange(event, 'PICKER', { ...nextState, errors: nextErrors });
	}

	checkSupportedDateFormat(props.dateFormat);

	return (
		<DateContext.Provider
			value={{
				value: {
					textInput: state.textInput,
					date: state.date,
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
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	useUTC: PropTypes.bool,
};

ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useUTC: false,
};

ContextualManager.displayName = 'Date.Manager';

export default ContextualManager;
