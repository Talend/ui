import requiredRules from './required';
import customFormatRules from './formats';
import patternRules from './pattern';
import customRules from './custom';

export default function schemaRules({ schema, customValidation, values, t }) {
	return {
		required: requiredRules(schema, t),
		validate: {
			custom: customRules(schema, customValidation, values),
			pattern: patternRules(schema, t),
			format: customFormatRules(schema, t),
		},
	};
}
