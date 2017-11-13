import ArrayWidget from '../fieldsets/Array';
import Columns from '../fieldsets/Columns';
import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import { Button, Buttons } from '../fields/Button';
import { CheckBox, CheckBoxes } from '../fields/CheckBox';
import Datalist from '../fields/Datalist';
import KeyValue from '../fields/KeyValue';
import ListView from '../fields/ListView';
import MultiSelectTag from '../fields/MultiSelectTag';
import Radios from '../fields/Radios';
import RadioOrSelect from '../fields/RadioOrSelect';
import Select from '../fields/Select';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';
import Toggle from '../fields/Toggle';

const widgets = {
	// fieldsets
	array: ArrayWidget,
	columns: Columns,
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

	// widgets
	buttons: Buttons,
	checkboxes: CheckBoxes,
	datalist: Datalist,
	keyValue: KeyValue,
	listView: ListView,
	multiSelectTag: MultiSelectTag,
	radioOrSelect: RadioOrSelect,
	toggle: Toggle,
};

export default widgets;
