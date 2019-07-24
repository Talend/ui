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

	const setVisibility = visibility => (visibility ? show : hide);

	return [visible, setVisibility];
};

export default useTooltipVisibility;
