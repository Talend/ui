import createInputPicker from '../shared/createInputPicker';
import DateTime from '../DateTime';

import theme from './InputDatePicker.scss';

const dateInputProps = {
	part: 'date',
	theme,
};
const InputDatePicker = createInputPicker(dateInputProps);

InputDatePicker.displayName = 'InputDatePicker';

export default InputDatePicker;
