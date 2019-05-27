import { useMemo } from 'react';
import { getValue, mutateValue } from '../utils/properties';
import { validateSingle } from '../utils/validation';
import { reconciliateSingleErrors } from '../utils/errors';

export default function useFinishHandler({
	customValidation,
	handleErrors,
	handleTrigger,
	id,
	moz,
	uiForm,
}) {
	return useMemo(
		() =>
			function handleFinish(
				event,
				{ schema, value },
				{ deepValidation = false, widgetChangeErrors } = {},
			) {
				// get property value
				const newValue = value === undefined ? getValue(uiForm.state.properties, schema) : value;

				// validate value. This validation can be deep if schema is an object or an array
				const widgetErrors = validateSingle(
					schema,
					newValue,
					uiForm.state.properties,
					customValidation,
					deepValidation,
				);
				const hasErrors = Object.values(widgetErrors).find(Boolean);
				let errors = reconciliateSingleErrors(uiForm.state.errors, widgetErrors);

				// widget error modifier
				if (widgetChangeErrors) {
					errors = widgetChangeErrors(errors);
				}

				// commit errors
				if (errors !== uiForm.state.errors) {
					handleErrors(event, errors, 'finish');
				}

				// legacy compatibility: trigger "after" is determined by onEvent = undefined
				// and is run on widget finish
				if (!hasErrors && schema.triggers && schema.triggers.length) {
					let formData = uiForm.state.properties;
					if (value !== undefined) {
						formData = mutateValue(formData, schema, value);
					}
					let propertyName = schema.key.join('.');
					if (moz) {
						schema.key.forEach((key, index) => {
							if (index !== schema.key.length - 1) {
								formData = formData[key];
							}
						});
						propertyName = schema.key[schema.key.length - 1];
						handleTrigger(event, { formData, formId: id, propertyName, value });
					} else {
						const trigger = schema.triggers.find(trig => trig.onEvent === undefined);
						if (trigger) {
							handleTrigger(event, {
								trigger,
								schema,
								properties: formData,
								errors,
								value,
							});
						}
					}
				}
			},
		[uiForm.state.properties, uiForm.state.errors, customValidation, handleErrors, handleTrigger],
	);
}
