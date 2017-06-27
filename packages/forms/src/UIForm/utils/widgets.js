import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button/Button.component';
import Buttons from '../fields/Button/Buttons.component';
import CheckBox from '../fields/CheckBox/CheckBox.component';
import CheckBoxes from '../fields/CheckBox/CheckBoxes.component';
import Radios from '../fields/Radios';
import Select from '../fields/Select';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';

const widgets = {
	// fieldsets
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
};

export default widgets;
