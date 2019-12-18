import requiredRules from './required';
import customFormatRules from './formats';
import patternRules from './pattern';
import customRules from './custom';
import { minRules, maxRules } from './minmax';
import { arrayMinRules, arrayMaxRules } from './array';

function useCustomMessage(schema, rule) {
	const { validationMessage } = schema;
	if (!validationMessage) {
		return rule;
	}

	if (typeof rule === 'string') {
		return validationMessage;
	}

	if (typeof rule === 'object') {
		return { ...rule, message: validationMessage };
	}

	if (typeof rule === 'function') {
		return (...args) => {
			const error = rule(...args);
			return error && validationMessage;
		};
	}

	return rule;
}

export default function schemaRules({ schema, customValidation, values, t }) {
	return {
		required: useCustomMessage(schema, requiredRules(schema, t)),
		pattern: useCustomMessage(schema, patternRules(schema, t)),
		min: useCustomMessage(schema, minRules(schema, t)),
		max: useCustomMessage(schema, maxRules(schema, t)),
		validate: {
			custom: useCustomMessage(schema, customRules(schema, customValidation, values)),
			format: useCustomMessage(schema, customFormatRules(schema, t)),
			arrayMinItems: arrayMinRules(schema, t),
			arrayMaxItems: arrayMaxRules(schema, t),
		},
	};
}
