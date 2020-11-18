import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DebounceInput from 'react-debounce-input';

import { TimeContext } from '../Context';
import InputSizer from '../../shared/InputSizer';
import theme from './Input.scss';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);
    const { minWidth } = props;

	return (
		<InputSizer inputText={inputManagement.placeholder} minWidth={minWidth}>
			{width => (
				<DebounceInput
					autoComplete="off"
					className={classnames('form-control', theme['time-picker-input'])}
					debounceTimeout={300}
					type="text"
					value={time.textInput}
					style={{ width }}
					maxLength={inputManagement.placeholder.length}
					{...inputManagement}
					{...props}
				/>
			)}
		</InputSizer>
	);
}

Input.propTypes = {
	minWidth: PropTypes.number,
};

Input.displayName = 'Time.Input';
