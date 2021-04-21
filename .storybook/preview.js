import React from 'react';
import { addParameters } from '@storybook/react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { TableOfContents, BackToTop } from 'storybook-docs-toc';
import { useKeyPressEvent, useLocalStorage } from 'react-use';
import 'focus-outline-manager';

import light, { dark } from '../src/themes';
import ThemeProvider from '../src/components/ThemeProvider';
import { IconsProvider } from '../src/components/IconsProvider';

const StorybookGlobalStyle = ThemeProvider.createGlobalStyle(
	({ theme, hasFigmaIframe }) => `
	.sb-show-main.sb-main-padded {
		padding: 0;
	}
	
	.sbdocs .sbdocs-preview {
		color: ${theme?.colors.textColor};
		background: ${theme?.colors.backgroundColor};
	}
	
	.sbdocs .figma-iframe--light {
		position: ${theme?.id === 'light' && hasFigmaIframe ? 'relative' : 'absolute'};
		left:  ${theme?.id === 'light' && hasFigmaIframe ? 'auto' : '-9999rem'};
	}
	
	.sbdocs .figma-iframe--dark {
		position: ${theme?.id === 'dark' && hasFigmaIframe ? 'relative' : 'absolute'};
		left:  ${theme?.id === 'dark' && hasFigmaIframe ? 'auto' : '-9999rem'};
	}
	`,
);

addParameters({
	docs: {
		container: props => {
			const [hasDarkMode, setDarkMode] = useLocalStorage('talend-coral--has-dark-mode', false);
			const [hasFigmaIframe, setFigmaIframe] = useLocalStorage(
				'talend-coral--has-figma-iframe',
				false,
			);

			useKeyPressEvent('m', () => setDarkMode(!hasDarkMode));
			useKeyPressEvent('i', () => setFigmaIframe(!hasFigmaIframe));

			return (
				<>
					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					<ThemeProvider theme={hasDarkMode ? dark : light}>
						<ThemeProvider.GlobalStyle />
						<StorybookGlobalStyle hasFigmaIframe={hasFigmaIframe} />
						<TableOfContents />
						<DocsContainer {...props} />
						<BackToTop />
					</ThemeProvider>
				</>
			);
		},
	},
});
