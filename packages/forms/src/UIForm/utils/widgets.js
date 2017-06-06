import Fieldset from '../fieldsets/Fieldset';
import Tabs from '../fieldsets/Tabs';

import Button from '../fields/Button';
import Text from '../fields/Text';
import Select from '../fields/Select';

const widgets = {
	// fieldsets
	fieldset: Fieldset,
	tabs: Tabs,

	// fields
	button: Button,
	number: Text,
	text: Text,
	select: Select,
};

export default widgets;
