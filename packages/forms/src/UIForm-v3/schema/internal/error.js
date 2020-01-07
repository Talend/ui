export function updateErrors(rhf, newErrors) {
	Object.keys(rhf.errors)
		.filter(key => !newErrors[key])
		.forEach(key => {
			rhf.clearError(key);
		});

	Object.entries(newErrors)
		.filter(([key]) => !rhf.errors[key])
		.forEach(([key, value]) => {
			rhf.setError(key, 'trigger', value);
		});
}

export function getError(errors, schema) {
	if (!errors) {
		return null;
	}
	const serializedKey = schema.key.join('.');
	return errors[serializedKey];
}
