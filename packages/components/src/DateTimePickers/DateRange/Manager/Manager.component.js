import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isBefore from 'date-fns/isBefore';

import { DateRangeContext } from '../Context';
import getErrorMessage from '../../shared/error-messages';

import {
	extractDate,
	extractFromDate,
	extractPartsFromTextInput,
} from '../../Date/date-extraction';

export function DateRangePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function extractRangeParts(startDate, endDate, options) {
	const startDateParts = extractDate(startDate, options);
	const endDateParts = extractDate(endDate, options);

	return {
		startDate: {
			value: startDateParts.localDate,
			textInput: startDateParts.textInput,
		},
		endDate: {
			value: endDateParts.localDate,
			textInput: endDateParts.textInput,
		},
		errors: startDateParts.errors.concat(endDateParts.errors),
		errorMessage: startDateParts.errorMessage || endDateParts.errorMessage,
	};
}

function ContextualManager(props) {
	const options = {
		dateFormat: props.dateFormat,
	};
	const initialState = extractRangeParts(props.startDate, props.endDate, options);
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.startDate !== state.startDate.value || props.endDate !== state.endDate.value) {
			const parts = extractRangeParts(props.startDate, props.endDate, options);
			setState(parts);
		}
	}, [props.startDate, props.endDate]);

	function onChange(event, nextState) {
		const errors = [...(nextState.errors || [])];
		const startDate = nextState.startDate.value;
		const endDate = nextState.endDate.value;

		if (startDate && endDate) {
			if (!isBefore(startDate, endDate)) {
				errors.push(
					new DateRangePickerException(
						'INVALID_RANGE_START_AFTER_END',
						'INVALID_RANGE_START_AFTER_END',
					),
				);
			}
		}

		if (props.onChange) {
			const payload = {
				startDate,
				endDate,
				errors,
				errorMessage: errors[0] ? errors[0].message : null,
				origin: nextState.origin,
			};
			props.onChange(event, payload);
		}
	}

	function onStartChange(event, { date: startDate }) {
		const { date, textInput, errors, errorMessage } = extractFromDate(startDate, options);
		const nextState = {};

		nextState.startDate = {
			value: date,
			textInput,
		};
		nextState.errors = errors;
		nextState.errorMessage = errorMessage;

		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'START_PICKER' });
	}

	function onEndChange(event, { date: endDate }) {
		const { date, textInput, errors, errorMessage } = extractFromDate(endDate, options);
		const nextState = {};

		nextState.endDate = {
			value: date,
			textInput,
		};
		nextState.errors = errors;
		nextState.errorMessage = errorMessage;

		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'END_PICKER' });
	}

	function onStartInputChange(event) {
		const userInput = event.target.value;
		const { localDate, textInput, errors, errorMessage } = extractPartsFromTextInput(
			userInput,
			options,
		);
		const nextState = {
			startDate: {
				value: localDate,
				textInput,
			},
			errors,
			errorMessage,
		};
		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'START_INPUT' });
	}

	function onEndInputChange(event) {
		const userInput = event.target.value;
		const { localDate, textInput, errors, errorMessage } = extractPartsFromTextInput(
			userInput,
			options,
		);
		const nextState = {
			endDate: {
				value: localDate,
				textInput,
			},
			errors,
			errorMessage,
		};
		setState(prevState => ({
			...prevState,
			...nextState,
		}));
		onChange(event, { ...state, ...nextState, origin: 'END_INPUT' });
	}

	return (
		<DateRangeContext.Provider
			value={{
				startDate: state.startDate,
				endDate: state.endDate,
				inputManagement: {
					onStartChange: onStartInputChange,
					onEndChange: onEndInputChange,
					placeholder: props.dateFormat,
				},
				pickerManagement: {
					onStartChange,
					onEndChange,
				},
			}}
		>
			{props.children}
		</DateRangeContext.Provider>
	);
}
ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
};
ContextualManager.displayName = 'DateRange.Manager';
ContextualManager.propTypes = {
	children: PropTypes.element,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	dateFormat: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default ContextualManager;
