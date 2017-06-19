import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button';
import Text from '../fields/Text';
import TextArea from '../fields/TextArea';

const widgets = {
	// fieldsets
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	number: Text,
	text: Text,
	textarea: TextArea,
};

export default widgets;
