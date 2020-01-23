export default function triggerRules({ validationTrigger, schema, rhf }) {
	if (!schema.key) {
		return () => {};
	}

	const key = schema.key.join('.');
	return () => {
		if (validationTrigger) {
			return validationTrigger();
		}

		// trigger validation is only managed by triggers
		// if we have a trigger error, we keep it, until a new trigger removes it
		const { errors } = rhf;
		if (errors[key] && errors[key].type === 'trigger') {
			return errors[key].message;
		}

		return null;
	};
}
