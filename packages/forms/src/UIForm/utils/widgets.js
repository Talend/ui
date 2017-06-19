import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button';
import CheckBox from '../fields/CheckBox';
import Text from '../fields/Text';

const widgets = {
	// fieldsets
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	checkbox: CheckBox,
	number: Text,
	text: Text,
};

export default widgets;
