import DateTime from './DateTime';
import InputDateTimePicker from './InputDateTimePicker';
import InputDatePicker from './InputDatePicker';
import InputDateRangePicker from './InputDateRangePicker';
import InputTimePicker from './InputTimePicker';

InputDateTimePicker.InputDatePicker = InputDatePicker;
InputDateTimePicker.InputDateRangePicker = InputDateRangePicker;
InputDateTimePicker.InputDateTimePicker = InputDateTimePicker;
InputDateTimePicker.InputTimePicker = InputTimePicker;

export default InputDateTimePicker;

export {
	/* TODO 6.0: remove DateTime export */ DateTime,
	InputDatePicker,
	InputDateRangePicker,
	InputDateTimePicker,
	InputTimePicker,
};
