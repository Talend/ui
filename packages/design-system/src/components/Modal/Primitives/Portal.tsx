import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
	children: ReactNode;
};

export function Portal({ children }: PortalProps) {
	const [el] = useState(document.createElement('div'));

	useEffect(() => {
		document.body.appendChild(el);
		return () => {
			document.body.removeChild(el);
		};
	}, [el]);

	return createPortal(children, el);
}
