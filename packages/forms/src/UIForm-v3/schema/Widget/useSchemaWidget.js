import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';

import { I18N_DOMAIN_FORMS } from '../../constants';

function replicateNewlyCreatedValues(key, value, values, rhf) {
	if (key && key in values) {
		return;
	}

	if (Array.isArray(value)) {
		value.forEach((item, index) =>
			replicateNewlyCreatedValues(`${key}[${index}]`, item, values, rhf),
		);
	} else if (typeof value === 'object') {
		const keyPrefix = key ? `${key}.` : '';
		Object.entries(value).forEach(([itemKey, item]) => {
			replicateNewlyCreatedValues(`${keyPrefix}${itemKey}`, item, values, rhf);
		});
	} else {
		console.log(`New value attached to key ${key}`, value);
		rhf.setValue(key, value);
	}
}

function replicateExistingValues(oldValues, newValues, rhf) {
	Object.entries(oldValues).forEach(([key, oldValue]) => {
		const newValue = get(newValues, key);
		if (newValue !== oldValue) {
			console.log(`"${key}" value has changed`, { oldValue, newValue });
			rhf.setValue(key, newValue);
		}
	});
}

function updateValues(rhf, valuesModifier) {
	const oldValues = rhf.getValues();
	const newValues =
		typeof valuesModifier === 'function'
			? valuesModifier(rhf.getValues({ nest: true }))
			: valuesModifier;

	// compare old keys to new ones, to update existing values if needed
	// this covers value removal and value update
	replicateExistingValues(oldValues, newValues, rhf);

	// go through all newValues keys, to add created values
	replicateNewlyCreatedValues('', newValues, oldValues, rhf);
}
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
