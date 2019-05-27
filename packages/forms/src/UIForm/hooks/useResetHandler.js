import { useMemo } from 'react';

export default function useResetHandler({ uiForm, onReset }) {
	return useMemo(
		() =>
			function handleReset(event) {
				uiForm.resetState();
				if (onReset) {
					onReset(event);
				}
			},
		[uiForm.resetState, onReset],
	);
}
