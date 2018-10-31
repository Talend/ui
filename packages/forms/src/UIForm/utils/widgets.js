import ArrayWidget from '../fieldsets/Array';
import createCollapsibleFieldset from '../fieldsets/CollapsibleFieldset';
import Columns from '../fieldsets/Columns';
import Fieldset, { FieldsetTextMode } from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import { Button, Buttons } from '../fields/Button';
import { CheckBox, CheckBoxes, TextModeCheckBox } from '../fields/CheckBox';
import Code, { CodeTextMode } from '../fields/Code';
import Datalist, { DatalistTextMode } from '../fields/Datalist';
import DateTime from '../fields/Date/DateTime';
import File from '../fields/File';
import KeyValue from '../fields/KeyValue';
import ListView from '../fields/ListView';
import MultiSelectTag, { MultiSelectTagTextMode } from '../fields/MultiSelectTag';
import NestedListView from '../fields/NestedListView';
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
	file: File,
	number: Text,
	password: Text,
	radios: Radios,
	reset: Button,
	select: Select,
	submit: Button,
	text: Text,
	textarea: TextArea,

	// fieldsets: text mode
	fieldset_text: FieldsetTextMode,

	// fields: text mode
	checkbox_text: TextModeCheckBox,
	checkboxes_text: ArrayWidget,
	code_text: CodeTextMode,
	datalist_text: DatalistTextMode,
	multiSelectTag_text: MultiSelectTagTextMode,
	number_text: TextTextMode,
	password_text: TextTextMode,
	text_text: TextTextMode,
	textarea_text: TextAreaTextMode,

	// widgets
	buttons: Buttons,
	checkboxes: CheckBoxes,
	code: Code,
	datalist: Datalist,
	dateTime: DateTime,
	keyValue: KeyValue,
	listView: ListView,
	multiSelectTag: MultiSelectTag,
	nestedListView: NestedListView,
	radioOrSelect: RadioOrSelect,
	toggle: Toggle,
};

export default widgets;
