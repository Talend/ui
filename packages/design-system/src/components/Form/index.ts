import Buttons from './Buttons';
import Datalist from './Field/Datalist';
import Input from './Field/Input';
import Select from './Field/Select';
import Textarea from './Field/Textarea';
import Fieldset from './Fieldset';
import Form from './Form';
import Label from './Label';
import Row from './Row';

export const FormComponent = Form as typeof Form & {
	Row: typeof Row;
	Color: typeof Input.Color;
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
};

FormComponent.Row = Row;

FormComponent.Color = Input.Color;
FormComponent.Datalist = Datalist;
FormComponent.Date = Input.Date;
FormComponent.DatetimeLocal = Input.DatetimeLocal;
FormComponent.Email = Input.Email;
FormComponent.Fieldset = Fieldset;
FormComponent.File = Input.File;
FormComponent.Hidden = Input.Hidden;
FormComponent.Copy = Input.Copy;
FormComponent.Label = Label;
FormComponent.Month = Input.Month;
FormComponent.Number = Input.Number;
FormComponent.Password = Input.Password;
FormComponent.Radio = Input.Radio;
FormComponent.Search = Input.Search;
FormComponent.Select = Select;
FormComponent.Tel = Input.Tel;
FormComponent.Text = Input.Text;
FormComponent.Textarea = Textarea;
FormComponent.Time = Input.Time;
FormComponent.Url = Input.Url;
FormComponent.Week = Input.Week;
FormComponent.Input = Input;

FormComponent.Buttons = Buttons;

export default FormComponent;
