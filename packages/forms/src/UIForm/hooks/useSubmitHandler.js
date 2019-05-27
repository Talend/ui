import { useMemo } from 'react';
import { validateAll } from '../utils/validation';
import { reconciliateAllErrors } from '../utils/errors';

export default function useSubmitHandler({
	customValidation,
	onSubmit,
	moz,
	uiForm,
	handleErrors,
}) {
	return useMemo(
		() =>
			function handleSubmit(event) {
				if (onSubmit) {
					event.preventDefault();
				}

				const newErrors = validateAll(
					uiForm.mergedSchema,
					uiForm.state.properties,
					customValidation,
				);
				const errors = reconciliateAllErrors(uiForm.state.errors, newErrors);
				const isValid = !Object.keys(errors).length;
				if (isValid) {
					uiForm.commitState();
					if (onSubmit) {
						if (moz) {
							onSubmit(null, { formData: uiForm.state.properties });
						} else {
							onSubmit(event, uiForm.state.properties, uiForm.mergedSchema);
						}
					}
				} else {
					handleErrors(event, errors, 'submit');
				}

				return isValid;
			},
		[customValidation, onSubmit, uiForm, handleErrors],
	);
}
