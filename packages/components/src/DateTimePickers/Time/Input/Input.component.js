import React, { useContext } from 'react';
import classnames from 'classnames';
import DebounceInput from 'react-debounce-input';

import { TimeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';
import theme from './Input.scss';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);

	return (
		<InputSizer
			placeholder={inputManagement.placeholder}
			inputText={time.time ? time.textInput : ''}
		>
			{width => (
				<DebounceInput
					autoComplete="off"
					className={classnames('form-control', theme['time-picker-input'])}
					debounceTimeout={300}
					type="text"
					value={time.textInput}
					style={{ width }}
					{...inputManagement}
					{...props}
				/>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Time.Input';
