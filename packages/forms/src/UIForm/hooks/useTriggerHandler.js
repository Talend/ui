import { useMemo } from 'react';

export default function useTriggerHandler({
	uiForm,
	onTrigger,
	handleErrors,
	handleNewProperties,
	moz,
}) {
	const updateUIFormData = useMemo(
		() => (event, payload, triggerResult) => {
			const { errors, properties } = triggerResult;
			if (errors) {
				handleErrors(event, errors, 'trigger');
			}
			if (properties) {
				handleNewProperties(event, { ...payload, properties });
			}
			return triggerResult;
		},
		[handleErrors, handleNewProperties],
	);

	return useMemo(
		() =>
			function handleTrigger(event, payload) {
				if (!onTrigger) {
					return null;
				}

				if (moz) {
					onTrigger(payload.formData, payload.formId, payload.propertyName, payload.value).then(
						triggerResult => updateUIFormData(event, payload, triggerResult),
					);
				}

				if (!payload.trigger) {
					throw new Error('onTrigger payload do not have required trigger property');
				}
				return onTrigger(event, {
					properties: uiForm.state.properties,
					errors: uiForm.state.errors,
					...payload,
				}).then(triggerResult => updateUIFormData(event, payload, triggerResult));
			},
		[onTrigger, updateUIFormData, uiForm.state.properties, uiForm.state.errors],
	);
}
