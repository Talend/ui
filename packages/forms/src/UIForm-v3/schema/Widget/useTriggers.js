import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import updateValues from '../internal/data';
import { updateErrors, getError } from '../internal/error';

function executeTrigger({ trigger, onTrigger, rhf, schema }) {
	return Promise.resolve()
		.then(() =>
			onTrigger({
				schema,
				trigger,
				errors: rhf.errors,
				properties: rhf.getValues({ nest: true }),
			}),
		)
		.then(result => {
			const { properties, errors } = result || {};
			const newErrors = typeof errors === 'function' ? errors(rhf.errors) : errors;

			if (properties) {
				updateValues(rhf, properties);
			}
			if (newErrors) {
				updateErrors(rhf, newErrors);
			}
			return { ...result, errors: newErrors };
		});
}

const eventPropName = {
	focus: 'onFocus',
	blur: 'onBlur',
	change: 'onChange',
	input: 'onInput',
};

export function useEventTriggers(schema) {
	const { onTrigger, ...rhf } = useFormContext();
	const { triggers = [] } = schema;

	return useMemo(() => {
		const eventTriggerDefinitions = triggers.filter(t => eventPropName[t.onEvent]);
		const events = {};

		if (eventTriggerDefinitions.length) {
			eventTriggerDefinitions.forEach(trigger => {
				const propsName = eventPropName[trigger.onEvent];
				events[propsName] = () => executeTrigger({ trigger, onTrigger, rhf, schema });
			});
		}
		return events;
	}, [onTrigger, rhf, schema, triggers]);
}

export function useValidationTrigger(schema) {
	const { onTrigger, ...rhf } = useFormContext();
	const { triggers = [] } = schema;

	return useMemo(() => {
		const trigger = triggers.find(t => t.validation);

		if (!trigger) {
			return undefined;
		}
		return () =>
			executeTrigger({ trigger, onTrigger, rhf, schema }).then(({ errors }) =>
				getError(errors, schema),
			);
	}, [onTrigger, rhf, schema, triggers]);
}
