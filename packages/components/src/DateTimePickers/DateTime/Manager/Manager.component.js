import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import {
	extractParts,
	extractPartsFromDateAndTime,
} from '../datetime-extraction';
import { DATE_INPUT_ERRORS, TIME_INPUT_ERRORS } from '../constants';

function ContextualManager(props) {
	// eslint-disable-next-line no-use-before-define
	const initialState = extractParts(props.value, getDateOptions());
	const [state, setState] = useState(initialState);

	useEffect(() => {
		// eslint-disable-next-line no-use-before-define
		const nextState = extractParts(props.value, getDateOptions());
		setState(nextState);
	}, [props.value]);

	function getDateOptions() {
		return {
			dateFormat: props.dateFormat,
			useTime: true,
			useSeconds: props.useSeconds,
			useUTC: props.useUTC,
			required: props.required,
		};
	}
	function onChange(event, payload) {
		if (props.onChange) {
			const { datetime, textInput, errors, errorMessage } = payload;
			props.onChange(event, { datetime, textInput, errors, errorMessage });
		}
	}
	function onDateChange(event, { date, errors }) {
		let nextValues;
		if (errors.length > 0) {
			nextValues = { datetime: null, textInput: '' };
		} else {
			nextValues = extractPartsFromDateAndTime(date, state.time, getDateOptions());
		}
		const nextErrors = state.errors
			.filter(error => !DATE_INPUT_ERRORS.includes(error.code))
			.concat(errors);

		const nextState = {
			...state,
			...nextValues,
			errors: nextErrors,
			errorMessage: nextErrors[0] ? nextErrors[0].message : null,
		};
		setState(nextState);
		onChange(event, nextState);
	}
	function onTimeChange(event, { time, errors }) {
		let newValues;
		if (errors.length > 0) {
			newValues = { datetime: null, textInput: '' };
		} else {
			newValues = extractPartsFromDateAndTime(state.date, time, getDateOptions());
		}
		const nextErrors = state.errors
			.filter(error => !TIME_INPUT_ERRORS.includes(error.code))
			.concat(errors);

		const nextState = {
			...state,
			...newValues,
			errors: nextErrors,
			errorMessage: nextErrors[0] ? nextErrors[0].message : null,
		};
		setState(nextState);
		onChange(event, nextState);
	}
	return (
		<DateTimeContext.Provider
			value={{
				date: state.date,
				time: state.time,
				onDateChange,
				onTimeChange,
			}}
		>
			{props.children}
		</DateTimeContext.Provider>
	);
}
ContextualManager.displayName = 'DateTime.Manager';
ContextualManager.propTypes = {
	children: PropTypes.node,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
};

ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useTime: false,
	useUTC: false,
};
export default ContextualManager;
