import { useContext } from 'react';
import DebounceInput from 'react-debounce-input';

import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import InputSizer from '../../shared/InputSizer';
import { DateContext } from '../Context';

function Input(props) {
	const { value, inputManagement } = useContext(DateContext);
	const { minWidth, ...rest } = props;

	return (
		<InputSizer inputText={inputManagement.placeholder} minWidth={minWidth}>
			{width => (
				<DebounceInput
					autoComplete="off"
					debounceTimeout={300}
					element={Form.Text}
					hideLabel
					value={value.textInput}
					style={{ width }}
					{...inputManagement}
					{...rest}
				/>
			)}
		</InputSizer>
	);
}

Input.displayName = 'Date.Input';

Input.propTypes = {
	minWidth: PropTypes.number,
};

export default Input;
