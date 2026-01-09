import { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import InputSizer from '../../shared/InputSizer';
import { TimeContext } from '../Context';

export default function Input(props) {
	const { time, inputManagement } = useContext(TimeContext);
	const { minWidth, ...rest } = props;

	return (
		<InputSizer inputText={inputManagement.placeholder} minWidth={minWidth}>
			{width => (
				<DebounceInput
					autoComplete="off"
					debounceTimeout={300}
					element={Form.Text}
					hideLabel
					value={time.textInput}
					style={{ width }}
					maxLength={inputManagement.placeholder.length}
					{...inputManagement}
					{...rest}
				/>
			)}
		</InputSizer>
	);
}

Input.propTypes = {
	minWidth: PropTypes.number,
};

Input.displayName = 'Time.Input';
