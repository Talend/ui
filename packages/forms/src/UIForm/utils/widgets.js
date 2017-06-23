import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button/Button.component';
import Buttons from '../fields/Button/Buttons.component';
import Radios from '../fields/Radios';
import Text from '../fields/Text';

const widgets = {
	// fieldsets
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	buttons: Buttons,
	number: Text,
	radios: Radios,
	reset: Button,
	submit: Button,
	text: Text,
};

export default widgets;
