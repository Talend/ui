import { useState } from 'react';

export default function useDisplayMode(initialDisplayMode, onChange) {
	const [displayMode, setDisplayMode] = useState(initialDisplayMode);

	function onDisplayModeChange(event, value) {
		if (onChange) {
			onChange(event, value);
		} else {
			setDisplayMode(value);
		}
	}
	return [displayMode, onDisplayModeChange];
}
