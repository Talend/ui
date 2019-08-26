import { useState } from 'react';

export default function useLocalStorage(localStorageKey, initialValue) {
	const [value, setValue] = useState(localStorage[localStorageKey] || initialValue);
	const onChange = newValue => {
		setValue(newValue);
		if (localStorageKey) {
			localStorage.setItem(localStorageKey, newValue);
		}
	};
	return [value, onChange];
}
