import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';
import updateValues from '../internal/data';

import { I18N_DOMAIN_FORMS } from '../../constants';

function updateErrors(rhf, errorsModifier) {
	const errors = typeof errorsModifier === 'function' ? errorsModifier(rhf.errors) : errorsModifier;
}

function getTriggerHandlers(schema, onTrigger, rhf) {
	const { triggers = [] } = schema;
	if (!onTrigger && triggers.length) {
		console.error(
			'Your form defines triggers on, but no onTrigger handler is provided. Those triggers will be ignored.',
		);
		return {};
	}

	const eventsProps = {};
	triggers.forEach(trigger => {
		const executeTrigger = () =>
			onTrigger({ schema, trigger }).then(result => {
				const { properties, errors } = result;
				if (properties) {
					updateValues(rhf, properties);
				}
				if (errors) {
					updateErrors(rhf, errors);
				}

				return result;
			});
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
	const rules = useMemo(() => schemaRules({ schema, customValidation, rhf, t }), [
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
