import createInputPicker from '../shared/createInputPicker';

import theme from './InputTimePicker.scss';

const timeInputProps = {
	part: 'time',
	theme,
};
const InputDatePicker = createInputPicker(timeInputProps);

InputDatePicker.displayName = 'InputTimePicker';

export default InputDatePicker;
