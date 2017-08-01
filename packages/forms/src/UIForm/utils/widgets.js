import ArrayWidget from '../fieldsets/Array';
import Columns from '../fieldsets/Columns';
import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import { Button, Buttons } from '../fields/Button';
import { CheckBox, CheckBoxes } from '../fields/CheckBox';
import Datalist from '../fields/Datalist';
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
	buttons: Buttons,
	checkbox: CheckBox,
	checkboxes: CheckBoxes,
	datalist: Datalist,
	number: Text,
	radios: Radios,
	radioOrSelect: RadioOrSelect,
	reset: Button,
	select: Select,
	submit: Button,
	text: Text,
	textarea: TextArea,
	toggle: Toggle,
};

export default widgets;
