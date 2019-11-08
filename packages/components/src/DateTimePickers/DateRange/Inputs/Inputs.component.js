import React, { useContext, useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';
import InputSizer from '../../shared/InputSizer';

import getDefaultT from '../../../translate';
import Icon from '../../../Icon';

import theme from './Inputs.scss';

const OMIT_PROPS_INPUT = ['t', 'id', 'startInputRef', 'endInputRef'];

function Inputs(props) {
	const { t } = props;
	const { startDate, endDate, inputManagement, focusedInput } = useContext(DateRangeContext);
	const { placeholder, onChange, onFocus } = inputManagement;

	let startDateInputRef = useRef(null);
	let endDateInputRef = useRef(null);

	useEffect(() => {
		if (startDateInputRef && focusedInput === START_DATE) {
			startDateInputRef.focus();
		}
		if (endDateInputRef && focusedInput === END_DATE) {
			endDateInputRef.focus();
		}
	}, [focusedInput]);

	return [
		<div>
			<label htmlFor={`${props.id}-start-date-input`} className="control-label">{t('TC_DATE_PICKER_RANGE_FROM', { defaultValue: 'From' })}</label>
			<InputSizer placeholder={placeholder} inputText={startDate.value ? startDate.textInput : ''}>
				{width => (
					<DebounceInput
						id={`${props.id}-start-date-input`}
						autoComplete="off"
						className="form-control"
						debounceTimeout={300}
						type="text"
						placeholder={placeholder}
						value={startDate.textInput}
						style={{ width }}
						onChange={onChange}
						onFocus={event => onFocus(event, START_DATE)}
						inputRef={ref => {
							if (props.startInputRef) {
								props.startInputRef(ref);
							}
							startDateInputRef = ref;
						}}
						{...omit(props, OMIT_PROPS_INPUT)}
					/>
				)}
			</InputSizer>
		</div>,
		<span className={theme.arrow}>
			<Icon name="talend-arrow-right" className={theme.icon} />
		</span>,
		<div>
			<label htmlFor={`${props.id}-end-date-input`} className="control-label">{t('DATE_RANGE_TO', { defaultValue: 'To' })}</label>
			<InputSizer placeholder={placeholder} inputText={endDate.value ? endDate.textInput : ''}>
				{width => (
					<DebounceInput
						id={`${props.id}-end-date-input`}
						autoComplete="off"
						className="form-control"
						debounceTimeout={300}
						type="text"
						placeholder={placeholder}
						value={endDate.textInput}
						style={{ width }}
						onChange={onChange}
						onFocus={event => onFocus(event, END_DATE)}
						inputRef={ref => {
							if (props.endInputRef) {
								props.endInputRef(ref);
							}
							endDateInputRef = ref;
						}}
						{...omit(props, OMIT_PROPS_INPUT)}
					/>
				)}
			</InputSizer>
		</div>,
	];
}

Inputs.displayName = 'DateRange.Inputs';
Inputs.defaultProps = {
	t: getDefaultT(),
};

export default Inputs;
