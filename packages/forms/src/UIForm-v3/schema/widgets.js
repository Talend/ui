import SchemaInput from './fields/Input';
import SchemaFieldset from './fieldsets/Fieldset';

export default {
	text: SchemaInput,
	number: SchemaInput,
	password: SchemaInput,
	email: SchemaInput,
	hidden: SchemaInput,

	fieldset: SchemaFieldset,
};
