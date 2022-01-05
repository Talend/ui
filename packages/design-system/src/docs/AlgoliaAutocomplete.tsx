import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { autocomplete } from '@algolia/autocomplete-js';

export function Autocomplete(props: React.FunctionComponent) {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) {
			return undefined;
		}

		const search = autocomplete({
			container: containerRef.current || '',
			renderer: { createElement, Fragment },
			render({ children }, root) {
				// @ts-ignore
				render(children, root);
			},
			...props,
		});

		return () => {
			search.destroy();
		};
	}, [props]);

	return <div ref={containerRef} />;
}
