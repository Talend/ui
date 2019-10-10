import { useState } from 'react';

let timeout;

const useTooltipVisibility = (tooltipDelay = 600) => {
	const [visible, setVisible] = useState(false);

	const show = () => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			setVisible(true);
		}, tooltipDelay);
	};

	const hide = () => {
		clearTimeout(timeout);
		setVisible(false);
	};

	return [visible, show, hide];
};

export default useTooltipVisibility;
