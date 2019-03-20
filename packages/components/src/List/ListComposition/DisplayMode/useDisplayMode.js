import { useState } from 'react';

export default function useDisplayMode(initialDisplayMode, onChange) {
	const [displayMode, setDisplayMode] = useState(initialDisplayMode);

	function onDisplayModeChange(event, value) {
		setDisplayMode(value);
		onChange(event, value);
	}
	return [displayMode, onDisplayModeChange];
}
