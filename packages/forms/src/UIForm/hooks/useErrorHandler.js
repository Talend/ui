import { useState, useEffect, useMemo } from 'react';

function useErrorFocusOnSubmit(formRef, errors) {
	const [lastErrorAction, setLastErrorAction] = useState();

	useEffect(() => {
		if (errors && Object.keys(errors).length && lastErrorAction === 'submit') {
			const elementWithError = formRef.current.querySelector('[aria-invalid="true"]');
			if (elementWithError) {
				elementWithError.focus();
			}
		}
	}, [formRef, lastErrorAction, errors]);

	return { setLastErrorAction };
}

export default function useErrorsHandler({ uiForm, onErrors, formRef }) {
	const { setLastErrorAction } = useErrorFocusOnSubmit(formRef, uiForm.state.errors);

	return useMemo(
		() =>
			function handleErrors(event, newErrors, origin) {
				setLastErrorAction(origin);
				if (onErrors) {
					onErrors(
						event,
						typeof newErrors === 'function' ? newErrors(uiForm.state.errors) : newErrors,
					);
				} else {
					uiForm.modifyState('errors', oldErrors =>
						typeof newErrors === 'function' ? newErrors(oldErrors) : newErrors,
					);
				}
			},
		[setLastErrorAction, uiForm.modifyState, uiForm.state.errors],
	);
}
