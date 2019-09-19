import React, { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import Icon from '../../../Icon';
import { TimeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';
import theme from './Input.scss';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);

	return (
		<InputSizer placeholder={inputManagement.placeholder} inputText={time.textInput}>
			{width => (
				<div className={theme['time-picker-input']}>
					<DebounceInput
						autoComplete="off"
						className="form-control"
						debounceTimeout={300}
						type="text"
						value={time.textInput}
						style={{ width }}
						{...inputManagement}
						{...props}
					/>
					{time.timezone && (
						<Icon
							name="talend-info-circle"
							title={time.timezone}
						/>
					)}
				</div>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Time.Input';
