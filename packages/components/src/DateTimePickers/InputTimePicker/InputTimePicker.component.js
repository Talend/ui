import createInputPicker from '../shared/createInputPicker';
import DateTime from '../DateTime';

import theme from './InputTimePicker.scss';

const timeInputProps = {
	part: 'time',
	theme,
	Picker: DateTime.TimePicker,
};
const InputDatePicker = createInputPicker(timeInputProps);

InputDatePicker.displayName = 'InputTimePicker';

export default InputDatePicker;
