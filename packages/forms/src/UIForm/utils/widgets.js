import ArrayWidget from '../fieldsets/Array';
import createCollapsibleFieldset from '../fieldsets/CollapsibleFieldset';
import Columns from '../fieldsets/Columns';
import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import { Button, Buttons } from '../fields/Button';
import { CheckBox, CheckBoxes } from '../fields/CheckBox';
import Code from '../fields/Code';
import Datalist, { DatalistTextMode } from '../fields/Datalist';
import KeyValue from '../fields/KeyValue';
import ListView from '../fields/ListView';
import MultiSelectTag from '../fields/MultiSelectTag';
import Radios from '../fields/Radios';
import RadioOrSelect from '../fields/RadioOrSelect';
import Select from '../fields/Select';
import Text, { TextTextMode } from '../fields/Text';
import TextArea, { TextAreaTextMode } from '../fields/TextArea';
import Toggle from '../fields/Toggle';

const widgets = {
	// fieldsets
	array: ArrayWidget,
	columns: Columns,
	collapsibleFieldset: createCollapsibleFieldset(),
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	checkbox: CheckBox,
	number: Text,
	password: Text,
	radios: Radios,
	reset: Button,
	select: Select,
	submit: Button,
	text: Text,
	textarea: TextArea,

	// fields: text mode
	datalist_text: DatalistTextMode,
	number_text: TextTextMode,
	password_text: TextTextMode,
	text_text: TextTextMode,
	textarea_text: TextAreaTextMode,

	// widgets
	buttons: Buttons,
	checkboxes: CheckBoxes,
	code: Code,
	datalist: Datalist,
	keyValue: KeyValue,
	listView: ListView,
	multiSelectTag: MultiSelectTag,
	radioOrSelect: RadioOrSelect,
	toggle: Toggle,
};

export default widgets;
