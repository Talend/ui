import React, { useContext, useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';
import InputSizer from '../../shared/InputSizer';

import Icon from '../../../Icon';

import theme from './Inputs.scss';

const OMIT_PROPS_INPUT = ['startInputRef', 'endInputRef'];

function Inputs(props) {
	const { startDate, endDate, inputManagement } = useContext(DateRangeContext);
	let startDateInputRef = useRef(null);
	let endDateInputRef = useRef(null);

	useEffect(() => {
		const { focusedInput } = inputManagement;

		if (startDateInputRef && focusedInput === START_DATE) {
			startDateInputRef.focus();
		}
		if (endDateInputRef && focusedInput === END_DATE) {
			endDateInputRef.focus();
		}
	});

	return [
		<InputSizer
			placeholder={inputManagement.placeholder}
			inputText={startDate.value ? startDate.textInput : ''}
		>
			{width => (
				<DebounceInput
					autoComplete="off"
					className="form-control"
					debounceTimeout={300}
					type="text"
					value={startDate.textInput}
					style={{ width }}
					onChange={inputManagement.onChange}
					onFocus={event => inputManagement.onFocus(event, START_DATE)}
					inputRef={ref => {
						if (props.startInputRef) {
							props.startInputRef(ref);
						}
						startDateInputRef = ref;
					}}
					{...omit(props, OMIT_PROPS_INPUT)}
				/>
			)}
		</InputSizer>,
		<span className={theme.arrow}>
			<Icon name="talend-arrow-right" className={theme.icon} />
		</span>,
		<InputSizer
			placeholder={inputManagement.placeholder}
			inputText={endDate.value ? endDate.textInput : ''}
		>
			{width => (
				<DebounceInput
					autoComplete="off"
					className="form-control"
					debounceTimeout={300}
					type="text"
					value={endDate.textInput}
					style={{ width }}
					onChange={inputManagement.onChange}
					onFocus={event => inputManagement.onFocus(event, END_DATE)}
					inputRef={ref => {
						if (props.endInputRef) {
							props.endInputRef(ref);
						}
						endDateInputRef = ref;
					}}
					{...omit(props, OMIT_PROPS_INPUT)}
				/>
			)}
		</InputSizer>,
	];
}

Inputs.displayName = 'DateRange.Inputs';

export default Inputs;
