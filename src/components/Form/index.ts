import Datalist from './Field/Datalist';
import Fieldset from './Fieldset';
import Form from './Form';
import Row from './Row';
import Buttons from './Buttons';
import Input from './Field/Input';
import InputGroup from './Field/InputGroup';
import Label from './Label';
import Select from './Field/Select';
import Textarea from './Field/Textarea';

import * as S from './Form.style';

export const FormComponent = Form as typeof Form & {
	Row: typeof Row;
	Color: typeof Input.Color;
	Checkbox: typeof Input.Checkbox;
	Datalist: typeof Datalist;
	Date: typeof Input.Date;
	DatetimeLocal: typeof Input.DatetimeLocal;
	Email: typeof Input.Email;
	Fieldset: typeof Fieldset;
	File: typeof Input.File;
	Hidden: typeof Input.Hidden;
	Copy: typeof Input.Copy;
	InputGroup: typeof InputGroup;
	Label: typeof Label;
	Month: typeof Input.Month;
	Number: typeof Input.Number;
	Password: typeof Input.Password;
	Radio: typeof Input.Radio;
	Range: typeof Input.Range;
	Search: typeof Input.Search;
	Select: typeof Select;
	Switch: typeof Input.Switch;
	Tel: typeof Input.Tel;
	Text: typeof Input.Text;
	Textarea: typeof Textarea;
	Time: typeof Input.Time;
	Url: typeof Input.Url;
	Week: typeof Input.Week;
	Buttons: typeof Buttons;
};

FormComponent.Row = Row;

FormComponent.Color = Input.Color;
FormComponent.Checkbox = Input.Checkbox;
FormComponent.Datalist = Datalist;
FormComponent.Date = Input.Date;
FormComponent.DatetimeLocal = Input.DatetimeLocal;
FormComponent.Email = Input.Email;
FormComponent.Fieldset = Fieldset;
FormComponent.File = Input.File;
FormComponent.Hidden = Input.Hidden;
FormComponent.Copy = Input.Copy;
FormComponent.InputGroup = InputGroup;
FormComponent.Label = Label;
FormComponent.Month = Input.Month;
FormComponent.Number = Input.Number;
FormComponent.Password = Input.Password;
FormComponent.Radio = Input.Radio;
FormComponent.Range = Input.Range;
FormComponent.Search = Input.Search;
FormComponent.Select = Select;
FormComponent.Switch = Input.Switch;
FormComponent.Tel = Input.Tel;
FormComponent.Text = Input.Text;
FormComponent.Textarea = Textarea;
FormComponent.Time = Input.Time;
FormComponent.Url = Input.Url;
FormComponent.Week = Input.Week;

FormComponent.Buttons = Buttons;

export default FormComponent;
