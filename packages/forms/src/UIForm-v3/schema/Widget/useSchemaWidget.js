import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SchemaFormContext from '../context';
import schemaRules from '../internal/validation/schemaRules';
import updateValues from '../internal/data';
import { updateErrors, getError } from '../internal/error';

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
			return Promise.resolve()
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
		}

		if (trigger.validation) {
			eventsProps.validation = () =>
				executeTrigger().then(({ errors }) => getError(errors, schema));
			return;
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

function getName(key) {
	if (!key) {
		return undefined;
	}
	const dotKey = key.join('.');

	// on arrays, we need to use bracket notation for RHF to nest the elements in an array
	// replace the '.number.' instances by '[number]'
	// ex: users.3.identities.0.firstname
	// - should match .3. and .0.
	// - returns users[3].identities[0].firstname
	const name = dotKey.replace(/\.([0-9]+)\./g, dotIndex =>
		dotIndex.replace('.', '[').replace('.', '].'),
	);

	// match the '.number' at the end
	// ex: users[3]identities.0
	// - should match .0
	// - returns users[3]identities[0]
	return name.replace(/\.([0-9]+)$/, dotIndex => `[${dotIndex.replace('.', '')}]`);
}

export default function useSchemaWidget(schema) {
	const { t } = useTranslation(I18N_DOMAIN_FORMS);
	const contextValue = useContext(SchemaFormContext);
	const { customFormats, customValidation, language, onTrigger, rhf } = contextValue;
	const { validation: validationTrigger, ...eventsProps } = useMemo(
		() => getTriggerHandlers(schema, onTrigger, rhf),
		[schema, onTrigger],
	);
	const rules = useMemo(
		() =>
			schemaRules({ customFormats, customValidation, validationTrigger, language, rhf, schema, t }),
		[customFormats, customValidation, validationTrigger, language, rhf, schema, t],
	);
	const name = useMemo(() => getName(schema.key), [schema.key]);

	const values = useMemo(
		() => ({
			...contextValue,
			eventsProps,
			name,
			rules,
		}),
		[contextValue, eventsProps, name, rules],
	);
	return values;
}
