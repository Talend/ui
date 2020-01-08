import requiredRules from './required';
import customFormatRules from './formats';
import patternRules from './pattern';
import customRules from './custom';
import { minRules, maxRules } from './minmax';
import { arrayMinRules, arrayMaxRules } from './array';
import enumRules from './enum';
import triggerRules from './trigger';

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

export default function schemaRules(configuration) {
	const { schema } = configuration;
	return {
		required: useCustomMessage(schema, requiredRules(configuration)),
		pattern: useCustomMessage(schema, patternRules(configuration)),
		min: useCustomMessage(schema, minRules(configuration)),
		max: useCustomMessage(schema, maxRules(configuration)),
		validate: {
			custom: useCustomMessage(schema, customRules(configuration)),
			format: useCustomMessage(schema, customFormatRules(configuration)),
			arrayMinItems: arrayMinRules(configuration),
			arrayMaxItems: arrayMaxRules(configuration),
			enum: useCustomMessage(schema, enumRules(configuration)),
			trigger: triggerRules(configuration),
		},
	};
}
