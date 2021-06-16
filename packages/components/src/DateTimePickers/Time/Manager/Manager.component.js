import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TimeContext } from '../Context';
import extractTime, { getTimeFormat } from '../time-extraction';

function TimeContextualManager(props) {
	const [state, setState] = useState(() => extractTime(props.value, props.useSeconds));

	useEffect(() => {
		const nextState = extractTime(props.value, props.useSeconds);
		if (!nextState.errorMessage) {
			setState(nextState);
		}
	}, [props.value, props.useSeconds]);

	function onChange(event, origin, nextState) {
		setState(nextState);
		if (!props.onChange) {
			return;
		}
		props.onChange(event, { ...nextState, origin });
	}

	function onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractTime(textInput, props.useSeconds);
		onChange(event, 'INPUT', nextState);
	}

	function onPickerChange(event, { textInput, time }) {
		const nextState = {
			time,
			textInput,
			errors: [],
			errorMessage: null,
		};
		onChange(event, 'PICKER', nextState);
	}

	return (
		<TimeContext.Provider
			value={{
				time: {
					time: state.time,
					textInput: state.textInput,
					timezone: props.timezone,
				},

				inputManagement: {
					onChange: onInputChange,
					placeholder: getTimeFormat(props.useSeconds),
				},

				pickerManagement: {
					onChange: onPickerChange,
				},
			}}
		>
			{props.children}
		</TimeContext.Provider>
	);
}
TimeContextualManager.displayName = 'Time.Manager';
TimeContextualManager.defaultProps = {
	useSeconds: false,
};
TimeContextualManager.propTypes = {
	children: PropTypes.node,
	onChange: PropTypes.func,
	useSeconds: PropTypes.bool,
	timezone: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default TimeContextualManager;
