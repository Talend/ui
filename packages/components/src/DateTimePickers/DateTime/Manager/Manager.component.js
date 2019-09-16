import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import { dateAndTimeToDateTime, extractParts, dateAndTimeToStr } from '../datetime-extraction';

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
	function onDateChange(event, { date, textInput: dateTextInput, errors = [] }) {
		let datetime;
		if (errors.length > 0) {
			datetime = null;
		} else {
			datetime = dateAndTimeToDateTime(date, state.time, getDateOptions());
		}
		const nextState = {
			...state,
			date: date || dateTextInput,
			datetime,
			textInput: dateAndTimeToStr(date || dateTextInput, state.time, getDateOptions()),
			errors,
			errorMessage: errors[0] ? errors[0].message : null,
		};
		setState(nextState);
		onChange(event, nextState);
	}
	function onTimeChange(event, { time, textInput: timeTextInput, errors = [] }) {
		let datetime;
		if (errors.length > 0) {
			datetime = null;
		} else {
			datetime = dateAndTimeToDateTime(state.date, time, getDateOptions());
		}
		const nextState = {
			...state,
			time: time || timeTextInput,
			datetime,
			textInput: dateAndTimeToStr(state.date, timeTextInput, getDateOptions()),
			errors,
			errorMessage: errors[0] ? errors[0].message : null,
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
	onChange: PropTypes.func,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
};

ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useUTC: false,
};
export default ContextualManager;
