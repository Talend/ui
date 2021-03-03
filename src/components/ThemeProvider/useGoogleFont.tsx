import { useEffect, useRef } from 'react';

function useGoogleFont(url: string) {
	const headRef = useRef<HTMLHeadElement>(null);
	// 	<link rel="preconnect" href="https://fonts.gstatic.com" />
	useEffect(() => {
		// @ts-ignore
		headRef.current = document.head;
		const link = document.createElement('link');
		link.setAttribute('rel', 'preconnect');
		link.setAttribute('href', 'https://fonts.gstatic.com');
		headRef.current.append(link);
	}, []);
	// <link
	//	href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Inconsolata:wght@300;400;500;600;700;800;900&display=swap"
	//	rel="stylesheet"
	// />
	useEffect(() => {
		const link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', url);
		// @ts-ignore
		headRef.current.append(link);
	}, [url]);
}

export default useGoogleFont;
