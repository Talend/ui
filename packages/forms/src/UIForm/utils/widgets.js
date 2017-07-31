import Columns from '../fieldsets/Columns';
import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import { Button, Buttons } from '../fields/Button';
import { CheckBox, CheckBoxes } from '../fields/CheckBox';
import Radios from '../fields/Radios';
import Select from '../fields/Select';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';
import Toggle from '../fields/Toggle';

const widgets = {
	// fieldsets
	columns: Columns,
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	buttons: Buttons,
	checkbox: CheckBox,
	checkboxes: CheckBoxes,
	number: Text,
	radios: Radios,
	reset: Button,
	select: Select,
	submit: Button,
	text: Text,
	textarea: TextArea,
	toggle: Toggle,
};

export default widgets;
