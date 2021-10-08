import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import {
	extractParts,
	updatePartsOnDateChange,
	updatePartsOnTimeChange,
} from '../datetime-extraction';

function ContextualManager(props) {
	function getDateOptions() {
		return {
			dateFormat: props.dateFormat,
			useSeconds: props.useSeconds,
			useUTC: props.useUTC,
			timezone: props.timezone,
			required: props.required,
		};
	}

	const initialState = extractParts(props.value, getDateOptions());
	const [state, setState] = useState(initialState);

	function onChange(event, payload) {
		if (props.onChange) {
			const { datetime, textInput, errors, errorMessage } = payload;
			props.onChange(event, { datetime, textInput, errors, errorMessage });
		}
	}

	useEffect(() => {
		if (props.value !== state.datetime) {
			const nextState = extractParts(props.value, getDateOptions());
			setState(nextState);
			// Triggering onChange will propagate the error to the outside world when the
			// new input is invalid and different then the default dateTime input.
			if (nextState.errors && nextState.errors.length > 0) {
				onChange(null, nextState);
			}
		}
	}, [props.value]);

	function onDateChange(event, payload) {
		const time = state.time || props.defaultTimeValue;
		const newState = updatePartsOnDateChange(payload, time, getDateOptions());
		const nextState = {
			...state,
			...newState,
		};
		setState(nextState);
		onChange(event, nextState);
	}
	function onTimeChange(event, payload) {
		const newState = updatePartsOnTimeChange(payload, state.date, getDateOptions());
		const nextState = {
			...state,
			...newState,
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
	defaultTimeValue: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	timezone: PropTypes.string,
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
};

ContextualManager.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useUTC: false,
};
export default ContextualManager;
