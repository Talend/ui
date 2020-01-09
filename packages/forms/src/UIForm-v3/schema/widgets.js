import SchemaDatalist from './fields/Datalist';
import SchemaInput from './fields/Input';
import SchemaInputTextMode from './fields/Input/TextMode.component';

import SchemaFieldset from './fieldsets/Fieldset';
import SchemaArrayFieldset from './fieldsets/Array';

export default {
	datalist: SchemaDatalist,
	email: SchemaInput,
	email_text: SchemaInputTextMode,
	hidden: SchemaInput,
	hidden_text: SchemaInputTextMode,
	number: SchemaInput,
	number_text: SchemaInputTextMode,
	password: SchemaInput,
	password_text: SchemaInputTextMode,
	text: SchemaInput,
	text_text: SchemaInputTextMode,

	array: SchemaArrayFieldset,
	fieldset: SchemaFieldset,
};
