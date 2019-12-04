import { useEffect } from 'react';

export default function useControlledInput({ defaultValue, name, registerOptions, rhf }) {
	const { register, setValue, unregister, watch } = rhf;
	useEffect(() => {
		register({ name }, registerOptions);
		if (defaultValue !== undefined) {
			setValue(name, defaultValue);
		}
		return () => unregister(name);
	}, [defaultValue, name, register, registerOptions, setValue, unregister]);

	return watch(name);
}
