import { useEffect } from 'react';

export default function useControlledInput({ defaultValue, name, rhf, rules }) {
	const { register, setValue, unregister, watch } = rhf;
	useEffect(() => {
		register({ name }, rules);
		if (defaultValue !== undefined) {
			setValue(name, defaultValue);
		}
		return () => unregister(name);
	}, [defaultValue, name, register, unregister]);

	return watch(name);
}
