import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';
import updateValues from '../internal/data';

import { I18N_DOMAIN_FORMS } from '../../constants';

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
		function executeTrigger() {
			const triggerPromise = Promise.resolve()
				.then(() =>
					onTrigger({
						schema,
						trigger,
						errors: rhf.errors,
						properties: rhf.getValues({ nest: true }),
					}),
				)
				.then((result = {}) => {
					const { properties, errors } = result;
					const newErrors = typeof errors === 'function' ? errors(rhf.errors) : errors;

					if (properties) {
						updateValues(rhf, properties);
					}
					if (newErrors) {
						updateErrors(rhf, newErrors);
					}
					return { ...result, errors: newErrors };
				});

			executeTrigger.validationPromise = triggerPromise.then(({ errors }) =>
				getError(errors, schema),
			);
			return triggerPromise;
		}
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
	const eventsProps = useMemo(() => getTriggerHandlers(schema, onTrigger, rhf), [
		schema,
		onTrigger,
	]);
	const rules = useMemo(() => schemaRules({ customValidation, eventsProps, rhf, schema, t }), [
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
