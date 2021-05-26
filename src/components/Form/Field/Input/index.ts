import Input from './Input';

import InputCheckbox from './Input.Checkbox';
import InputColor from './Input.Color';
import InputCopy from './Input.Copy';
import InputDate from './Input.Date';
import InputDatetimeLocal from './Input.DatetimeLocal';
import InputEmail from './Input.Email';
import InputFile from './Input.File';
import InputHidden from './Input.Hidden';
import InputMonth from './Input.Month';
import InputNumber from './Input.Number';
import InputPassword from './Input.Password';
import InputRadio from './Input.Radio';
import InputRange from './Input.Range';
import InputSearch from './Input.Search';
import InputSwitch from './Input.Switch';
import InputTel from './Input.Tel';
import InputText from './Input.Text';
import InputTime from './Input.Time';
import InputUrl from './Input.Url';
import InputWeek from './Input.Week';

const InputComponent = Input as typeof Input & {
	Checkbox: typeof InputCheckbox;
	Color: typeof InputColor;
	Copy: typeof InputCopy;
	Date: typeof InputDate;
	DatetimeLocal: typeof InputDatetimeLocal;
	Email: typeof InputEmail;
	File: typeof InputFile;
	Hidden: typeof InputHidden;
	Month: typeof InputMonth;
	Number: typeof InputNumber;
	Password: typeof InputPassword;
	Radio: typeof InputRadio;
	Range: typeof InputRange;
	Search: typeof InputSearch;
	Switch: typeof InputSwitch;
	Tel: typeof InputTel;
	Text: typeof InputText;
	Time: typeof InputTime;
	Url: typeof InputUrl;
	Week: typeof InputWeek;
};

InputComponent.Checkbox = InputCheckbox;
InputComponent.Color = InputColor;
InputComponent.Copy = InputCopy;
InputComponent.Date = InputDate;
InputComponent.DatetimeLocal = InputDatetimeLocal;
InputComponent.Email = InputEmail;
InputComponent.File = InputFile;
InputComponent.Hidden = InputHidden;
InputComponent.Month = InputMonth;
InputComponent.Number = InputNumber;
InputComponent.Password = InputPassword;
InputComponent.Radio = InputRadio;
InputComponent.Range = InputRange;
InputComponent.Search = InputSearch;
InputComponent.Switch = InputSwitch;
InputComponent.Tel = InputTel;
InputComponent.Text = InputText;
InputComponent.Time = InputTime;
InputComponent.Url = InputUrl;
InputComponent.Week = InputWeek;

export default InputComponent;
