import SchemaInput from './fields/Input';
import SchemaFieldset from './fieldsets/Fieldset';
import SchemaArrayFieldset from './fieldsets/Array';

export default {
	text: SchemaInput,
	number: SchemaInput,
	password: SchemaInput,
	email: SchemaInput,
	hidden: SchemaInput,

	array: SchemaArrayFieldset,
	fieldset: SchemaFieldset,
};
