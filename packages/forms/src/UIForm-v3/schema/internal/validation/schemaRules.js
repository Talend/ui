import requiredRules from './required';
import customFormatRules from './formats';
import patternRules from './pattern';
import customRules from './custom';
import { minRules, maxRules } from './minmax';
import { arrayMinRules, arrayMaxRules } from './array';
import enumRules from './enum';

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

function updateErrors(rhf, newErrors) {
	console.log('updateErrors');
	Object.keys(rhf.errors)
		.filter(key => !newErrors[key])
		.forEach(key => {
			console.log('clear');
			rhf.clearError(key);
		});

	Object.entries(newErrors)
		.filter(([key]) => !rhf.errors[key])
		.forEach(([key, value]) => {
			console.log('set', value);
			rhf.setError(key, 'trigger', value);
		});
}
function useTriggerValidation(schema, triggerBlur, rhf) {
	if (!triggerBlur) {
		return () => {};
	}
	return () => {
		const maybePromise = triggerBlur();
		if (maybePromise && maybePromise.then) {
			return maybePromise.then(result => {
				const { errors } = result;
				const newErrors = typeof errors === 'function' ? errors(rhf.errors) : errors;
				if (newErrors) {
					updateErrors(rhf, newErrors);
					return newErrors[schema.key.join('.')];
				}
				return null;
			});
		}
		return null;
	};
}

export default function schemaRules({ schema, customValidation, rhf, t, triggerBlur }) {
	return {
		required: useCustomMessage(schema, requiredRules(schema, t)),
		pattern: useCustomMessage(schema, patternRules(schema, t)),
		min: useCustomMessage(schema, minRules(schema, t)),
		max: useCustomMessage(schema, maxRules(schema, t)),
		validate: {
			custom: useCustomMessage(schema, customRules(schema, customValidation, rhf)),
			format: useCustomMessage(schema, customFormatRules(schema, t)),
			arrayMinItems: arrayMinRules(schema, t),
			arrayMaxItems: arrayMaxRules(schema, t),
			enum: useCustomMessage(schema, enumRules(schema, t)),
			trigger: useTriggerValidation(schema, triggerBlur, rhf),
		},
	};
}
