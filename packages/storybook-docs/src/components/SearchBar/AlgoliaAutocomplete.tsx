import { createElement, Fragment, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { autocomplete } from '@algolia/autocomplete-js';

// @see https://www.algolia.com/doc/ui-libraries/autocomplete/guides/using-react/#creating-the-component
export function Autocomplete(props: any) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) {
			return undefined;
		}

		const search = autocomplete({
			container: containerRef.current || '',
			renderer: { createElement, Fragment },
			render({ children }, root) {
				createRoot(root).render(children as ReactElement);
			},
			...props,
		});

		return () => {
			search.destroy();
		};
	}, [props]);

	return <div ref={containerRef} />;
}
