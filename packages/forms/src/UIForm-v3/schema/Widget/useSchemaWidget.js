import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';
import updateValues from '../internal/data';

import { I18N_DOMAIN_FORMS } from '../../constants';

function updateErrors(rhf, errorsModifier) {
	const newErrors =
		typeof errorsModifier === 'function' ? errorsModifier(rhf.errors) : errorsModifier;
	Object.keys(rhf.errors)
		.filter(key => !newErrors[key])
		.forEach(key => {
			rhf.clearError(key);
		});

	Object.entries(newErrors)
		.filter(([key]) => !rhf.errors[key])
		.forEach(([key, value]) => {
			rhf.setError(key, 'trigger', value);
		});
}

function getTriggerHandlers(schema, onTrigger, rhf) {
	const { triggers = [] } = schema;
	if (!onTrigger && triggers.length) {
		console.error(
			'Your form defines triggers, but no onTrigger handler is provided. Those triggers will be ignored but this might not be what you wanted.',
		);
		return {};
	}

	const eventsProps = {};
	triggers.forEach(trigger => {
		const executeTrigger = () => {
			console.log('ecevute trigger');
			// return rhf
			// 	.triggerValidation(schema.key.join('.'), true)
			// 	.then(() => onTrigger({ schema, trigger }))
			// 	.then(result => {
			// 		const { properties, errors } = result || {};
			// 		if (properties) {
			// 			updateValues(rhf, properties);
			// 		}
			// 		if (errors) {
			// 			updateErrors(rhf, errors);
			// 		}
			// 		return result;
			// 	});

			const maybePromise = onTrigger({
				schema,
				trigger,
				errors: rhf.errors,
				properties: rhf.getValues({ nest: true }),
			});
			if (maybePromise && maybePromise.then) {
				return maybePromise.then(result => {
					const { properties, errors } = result;
					if (properties) {
						updateValues(rhf, properties);
					}
					// if (errors) {
					// 	updateErrors(rhf, errors);
					// }
					return result;
				});
			}
			return maybePromise;
		};
		switch (trigger.onEvent) {
			case 'focus': {
				eventsProps.onFocus = executeTrigger;
				break;
			}
			case 'blur': {
				eventsProps.onBlur = executeTrigger;
				break;
			}
			case 'change': {
				eventsProps.onChange = executeTrigger;
				break;
			}
			case 'input': {
				eventsProps.onInput = executeTrigger;
				break;
			}
			default:
				break;
		}
	});
	return eventsProps;
}

export default function useSchemaWidget(schema) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const contextValue = useContext(SchemaFormContext);
	const { onTrigger, customValidation, rhf } = contextValue;
	const { onBlur: triggerBlur, ...eventsProps } = useMemo(
		() => getTriggerHandlers(schema, onTrigger, rhf),
		[schema, onTrigger],
	);
	// const { onBlur: triggerBlur, ...eventsProps } = getTriggerHandlers(schema, onTrigger, rhf);
	const rules = useMemo(() => schemaRules({ schema, customValidation, rhf, t, triggerBlur }), [
		schema,
		customValidation,
		rhf.getValues,
		t,
	]);

	const values = useMemo(
		() => ({
			...contextValue,
			eventsProps,
			rules,
		}),
		[contextValue, eventsProps, rules],
	);
	return values;
}
