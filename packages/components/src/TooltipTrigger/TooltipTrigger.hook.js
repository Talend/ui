import { useState } from 'react';

const useTooltipVisibility = (tooltipDelay = 600) => {
	let timeout;

	const [visible, setVisible] = useState(false);

	const show = () => {
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
