import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import { extractParts, extractPartsFromDateAndTime } from '../datetime-extraction';

function ContextualManager(props) {
	const initialState = extractParts(props.selectedDateTime);
	const [state, setState] = useState(initialState);

	useEffect(() => {
		const nextState = extractParts(props.selectedDateTime);
		setState(nextState);
	}, [props.selectedDateTime]);

	function getDateOptions() {
		return {
			dateFormat: props.dateFormat,
			useTime: props.useTime,
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
	function onDateChange(event, { date }) {
		const nextState = extractPartsFromDateAndTime(date, state.time, getDateOptions());
		setState(nextState);
		onChange(event, nextState);
	}
	function onTimeChange(event, { time }) {
		console.log('-------------')
		console.log(time);
		const nextState = extractPartsFromDateAndTime(state.date, time, getDateOptions());
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
	selectedDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
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
