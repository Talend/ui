import Buttons from './Buttons';
import Datalist from './Field/Datalist';
import Input from './Field/Input';
import Select from './Field/Select';
import Textarea from './Field/Textarea';
import Fieldset from './Fieldset';
import { Form as FormBase, FormProps } from './Form';
import Label from './Label';
import Row from './Row';

export type { FormProps };
export type FormType = typeof FormBase & {
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
	Label: typeof Label;
	Month: typeof Input.Month;
	Number: typeof Input.Number;
	Password: typeof Input.Password;
	Radio: typeof Input.Radio;
	Search: typeof Input.Search;
	Select: typeof Select;
	Tel: typeof Input.Tel;
	Text: typeof Input.Text;
	Textarea: typeof Textarea;
	Time: typeof Input.Time;
	Url: typeof Input.Url;
	Week: typeof Input.Week;
	Buttons: typeof Buttons;
	Input: typeof Input;
	ToggleSwitch: typeof Input.ToggleSwitch;
};

export const Form = FormBase as FormType;
Form.Row = Row;
Form.Color = Input.Color;
Form.Copy = Input.Copy;
Form.Checkbox = Input.Checkbox;
Form.Datalist = Datalist;
Form.Date = Input.Date;
Form.DatetimeLocal = Input.DatetimeLocal;
Form.Email = Input.Email;
Form.Fieldset = Fieldset;
Form.File = Input.File;
Form.Hidden = Input.Hidden;
Form.Label = Label;
Form.Month = Input.Month;
Form.Number = Input.Number;
Form.Password = Input.Password;
Form.Radio = Input.Radio;
Form.Search = Input.Search;
Form.Select = Select;
Form.ToggleSwitch = Input.ToggleSwitch;
Form.Tel = Input.Tel;
Form.Text = Input.Text;
Form.Textarea = Textarea;
Form.Time = Input.Time;
Form.Url = Input.Url;
Form.Week = Input.Week;
Form.Input = Input;

Form.Buttons = Buttons;
