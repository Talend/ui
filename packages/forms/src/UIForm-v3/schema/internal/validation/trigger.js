export default function triggerRules(eventsProps, schema, rhf) {
	const key = schema.key.join('.');
	return () => {
		const { errors } = rhf;
		const { onBlur, onChange, onInput } = eventsProps;

		// there is an input/change/ blur trigger (in progress or finished)
		// if it returns a new error state, it must be taken into account in the trigger errors
		// an old trigger is still valid because trigger errors are managed only by triggers system
		if (
			(onInput && onInput.validationPromise) ||
			(onChange && onChange.validationPromise) ||
			(onBlur && onBlur.validationPromise)
		) {
			return Promise.all([
				onInput && onInput.validationPromise,
				onChange && onChange.validationPromise,
				onBlur && onBlur.validationPromise,
			]).then(
				([inputErrorMessage, changeErrorMessage, blurErrorMessage]) =>
					inputErrorMessage || changeErrorMessage || blurErrorMessage,
			);
		}

		// trigger validation is only managed by triggers
		// if we have a trigger error, we keep it, until a new trigger removes it
		if (errors[key] && errors[key].type === 'trigger') {
			return errors[key].message;
		}

		return null;
	};
}
