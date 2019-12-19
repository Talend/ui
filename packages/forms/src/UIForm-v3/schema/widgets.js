import SchemaDatalist from './fields/Datalist';
import SchemaInput from './fields/Input';

import SchemaFieldset from './fieldsets/Fieldset';
import SchemaArrayFieldset from './fieldsets/Array';

export default {
	datalist: SchemaDatalist,
	email: SchemaInput,
	hidden: SchemaInput,
	number: SchemaInput,
	password: SchemaInput,
	text: SchemaInput,

	array: SchemaArrayFieldset,
	fieldset: SchemaFieldset,
};
