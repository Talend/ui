import requiredRules from './required';
import customFormatRules from './formats';
import patternRules from './pattern';
import customRules from './custom';
import { minRules, maxRules } from './minmax';

export default function schemaRules({ schema, customValidation, values, t }) {
	return {
		required: requiredRules(schema, t),
		pattern: patternRules(schema, t),
		min: minRules(schema, t),
		max: maxRules(schema, t),
		validate: {
			custom: customRules(schema, customValidation, values),
			format: customFormatRules(schema, t),
		},
	};
}
