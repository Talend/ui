import React, { FunctionComponent, useEffect } from 'react';
import { document, window } from 'global';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider, ensure as ensureTheme } from '@storybook/theming';
import { DocsWrapper, DocsContent } from '@storybook/components';
import { components as htmlComponents } from '@storybook/components/html';

import { DocsContextProps, DocsContext } from '@storybook/addon-docs/dist/blocks/DocsContext';
import { anchorBlockIdFromId } from '@storybook/addon-docs/dist/blocks/Anchor';
import { storyBlockIdFromId } from '@storybook/addon-docs/dist/blocks/Story';
import { CodeOrSourceMdx, AnchorMdx, HeadersMdx } from '@storybook/addon-docs/dist/blocks/mdx';
import { scrollToElement } from '@storybook/addon-docs/dist/blocks/utils';

import TableOfContents from './TableOfContents';

interface DocsContainerProps {
	context: DocsContextProps;
}

const defaultComponents = {
	...htmlComponents,
	code: CodeOrSourceMdx,
	a: AnchorMdx,
	...HeadersMdx,
};

export const DocsContainer: FunctionComponent<DocsContainerProps> = ({ context, children }) => {
	const { id: storyId = null, parameters = {} } = context || {};
	const options = parameters.options || {};
	const theme = ensureTheme(options.theme);
	const { components: userComponents = null } = parameters.docs || {};
	const allComponents = { ...defaultComponents, ...userComponents };

	useEffect(() => {
		let url;
		try {
			url = new URL(window.parent.location);
		} catch (err) {
			return;
		}
		if (url.hash) {
			const element = document.getElementById(url.hash.substring(1));
			if (element) {
				// Introducing a delay to ensure scrolling works when it's a full refresh.
				setTimeout(() => {
					scrollToElement(element);
				}, 200);
			}
		} else {
			const element =
				document.getElementById(anchorBlockIdFromId(storyId)) ||
				document.getElementById(storyBlockIdFromId(storyId));
			if (element) {
				const allStories = element.parentElement.querySelectorAll('[id|="anchor-"]');
				let block = 'start';
				if (allStories && allStories[0] === element) {
					block = 'end'; // first story should be shown with the intro content above
				}
				// Introducing a delay to ensure scrolling works when it's a full refresh.
				setTimeout(() => {
					scrollToElement(element, block);
				}, 200);
			}
		}
	}, [storyId]);

	return (
		<DocsContext.Provider value={context}>
			<ThemeProvider theme={theme}>
				<MDXProvider components={allComponents}>
					<DocsWrapper className="sbdocs sbdocs-wrapper">
						<TableOfContents />
						<DocsContent className="sbdocs sbdocs-content">{children}</DocsContent>
					</DocsWrapper>
				</MDXProvider>
			</ThemeProvider>
		</DocsContext.Provider>
	);
};
