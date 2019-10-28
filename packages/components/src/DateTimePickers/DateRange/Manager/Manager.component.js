import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DateRangeContext } from '../Context';
import { extractParts } from '../date-range-extraction';
import { extractFromDate } from '../../Date/date-extraction';
import { START_DATE, END_DATE } from '../constants';

function ContextualManager(props) {
	function getOptions() {
		return {
			dateFormat: props.dateFormat,
		};
	}
	const initialState = extractParts(props.startDate, props.endDate, getOptions());
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.startDate !== state.startDate || props.endDate !== state.endDate) {
			const parts = extractParts(props.startDate, props.endDate, getOptions());
			setState(parts);
		}
	}, [props.startDate, props.endDate]);

	function onDatesChange(event, nextState) {
		if (props.onDatesChange) {
			const payload = {
				startDate: nextState.startDate,
				endDate: nextState.endDate,
			};
			props.onDatesChange(event, payload);
		}
	}

	function onFocusChange(event, focusedInput) {
		setState({
			...state,
			focusedInput,
		});
	}

	function onSelectDate(event, { date }) {
		const newDateParts = extractFromDate(date, getOptions());
		let nextState;
		if (state.focusedInput === START_DATE) {
			nextState = {
				...state,
				startDate: newDateParts.date,
				startDateTextInput: newDateParts.textInput,
			};
			onFocusChange(END_DATE);
		} else {
			nextState = {
				...state,
				endDate: newDateParts.date,
				endDateTextInput: newDateParts.textInput,
			};
		}
		setState(nextState);
		onDatesChange(event, nextState);
	}
	return (
		<DateRangeContext.Provider
			value={{
				startDate: {
					value: state.startDate,
					textInput: state.startDateTextInput,
				},
				endDate: {
					value: state.endDate,
					textInput: state.endDateTextInput,
				},
				inputManagement: {
					onDatesChange,
					onFocus: onFocusChange,
					focusedInput: state.focusedInput,
				},
				pickerManagement: {
					onSubmit: onSelectDate,
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
	onDatesChange: PropTypes.func.isRequired,
};

export default ContextualManager;
