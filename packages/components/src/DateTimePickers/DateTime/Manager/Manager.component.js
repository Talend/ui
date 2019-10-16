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

	useEffect(() => {
		if (props.value !== state.datetime) {
			const nextState = extractParts(props.value, getDateOptions());
			setState(nextState);
		}
	}, [props.value]);

	function onChange(event, payload) {
		if (props.onChange) {
			const { datetime, textInput, errors, errorMessage } = payload;
			props.onChange(event, { datetime, textInput, errors, errorMessage });
		}
	}
	function onDateChange(event, payload) {
		const newState = updatePartsOnDateChange(payload, state.time, getDateOptions());
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
