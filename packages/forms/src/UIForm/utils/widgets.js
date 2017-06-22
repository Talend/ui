import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button';
import CheckBox from '../fields/CheckBox/CheckBox.component';
import CheckBoxes from '../fields/CheckBox/CheckBoxes.component';
import Text from '../fields/Text';

const widgets = {
	// fieldsets
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	checkbox: CheckBox,
	checkboxes: CheckBoxes,
	number: Text,
	text: Text,
};

export default widgets;
