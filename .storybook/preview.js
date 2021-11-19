import React from 'react';
import { I18nextProvider } from 'react-i18next';
import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

import { addons } from '@storybook/addons';
import { DocsContainer } from '@storybook/addon-docs';
import { UPDATE_GLOBALS } from '@storybook/core-events';
import { TableOfContents, BackToTop } from 'storybook-docs-toc';
import { useLocalStorage } from 'react-use';

import 'focus-outline-manager';

import i18n from './i18n';

import Divider from '../src/components/Divider';
import Form from '../src/components/Form';
import ThemeProvider from '../src/components/ThemeProvider';
import { IconsProvider } from '../src/components/IconsProvider';

import { light, dark } from '../src/themes';

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Choose a theme to apply to the design system',
		toolbar: {
			icon: 'paintbrush',
			items: [
				{ value: 'light', left: '⚪️', title: 'Default theme' },
				{ value: 'dark', left: '⚫️', title: 'Dark theme' },
			],
		},
	},
	locale: {
		name: 'Locale',
		defaultValue: 'en',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'zh', title: 'Chinese' },
				{ value: 'en', title: 'English' },
				{ value: 'fr', title: 'French' },
				{ value: 'de', title: 'German' },
				{ value: 'ja', title: 'Japanese' },
			],
		},
	},
};

const getTheme = themeKey => (themeKey === 'dark' ? dark : light);

const StorybookGlobalStyle = ThemeProvider.createGlobalStyle(
	({ theme, hasFigmaIframe }) =>
		`
	.sb-show-main.sb-main-padded {
		padding: 0;
	}
	
	.sbdocs.sbdocs-preview {
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

const channel = addons.getChannel();

export const parameters = {
	docs: {
		container: props => {
			const [hasFigmaIframe, setFigmaIframe] = useLocalStorage('coral--has-figma-iframe', false);
			const [hasDarkMode, setDarkMode] = useLocalStorage('coral--has-dark-mode', false);
			const [hasBootstrapStylesheet, setBootstrapStylesheet] = useLocalStorage(
				'coral--has-bootstrap-stylesheet',
				true,
			);

			React.useEffect(() => {
				channel.emit(UPDATE_GLOBALS, {
					globals: { theme: hasDarkMode ? 'dark' : 'light' },
				});
			}, [hasDarkMode]);

			React.useEffect(() => {
				const theme = props.context.globals?.theme;
				const hasDarkModeFromToolbar = theme === 'dark';
				if (hasDarkModeFromToolbar != hasDarkMode) {
					setDarkMode(hasDarkModeFromToolbar);
				}
			}, [props.context.globals?.theme]);

			React.useEffect(() => {
				document
					.querySelectorAll('#bootstrap-theme')
					.forEach(link => (link.disabled = !hasBootstrapStylesheet));
			}, [hasBootstrapStylesheet]);

			return (
				<>
					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					<ThemeProvider theme={hasDarkMode ? dark : light}>
						<ThemeProvider.GlobalStyle />
						<StorybookGlobalStyle hasFigmaIframe={hasFigmaIframe} />
					</ThemeProvider>
					<TableOfContents>
						{['component', 'template', 'page'].find(term =>
							props.context.title?.split('/')[0].toLocaleLowerCase().includes(term),
						) && (
							<ThemeProvider>
								<Divider />
								<Form.Switch
									label={'Dark mode'}
									onChange={() => {
										setDarkMode(!hasDarkMode);
									}}
									checked={hasDarkMode}
								/>
								<Form.Switch
									label={'Bootstrap stylesheet'}
									onChange={() => setBootstrapStylesheet(!hasBootstrapStylesheet)}
									checked={!!hasBootstrapStylesheet}
								/>
								{/*
								<Form.Switch
									label={'Figma iframes'}
									onChange={() => setFigmaIframe(!hasFigmaIframe)}
									checked={!!hasFigmaIframe}
								/>
								*/}
							</ThemeProvider>
						)}
					</TableOfContents>
					<DocsContainer {...props} />
					<BackToTop />
				</>
			);
		},
		source: {
			state: 'open',
		},
		transformSource: input => {
			const format = source =>
				prettier.format(source, {
					parser: 'babel',
					plugins: [prettierBabel],
				});
			// remove code snippet with selector since is redundant
			if (input?.includes('WithSelector')) {
				return ' ';
			}
			try {
				// if wrapped into an arrow function
				if (input?.trim().startsWith('(')) {
					const body = input.replace(/\((.*)\) => {?((.|\n)*)?}?/gm, '$2');
					return format(body).trim().replace(/;$/, '');
				}
				// try to format JSX
				// remove last semicolon added by Prettier
				return format(input).trim().replace(/;$/, '');
			} catch (e) {
				// otherwise, return the same string
				return input;
			}
		},
	},
	options: {
		storySort: {
			order: [
				'Welcome',
				'Getting Started',
				'Component catalog',
				'Design Tokens',
				'Themes',
				'Content',
				'Components',
				[
					'Accordion',
					'Button',
					'Combobox',
					'Divider',
					'Drawer',
					'Dropdown',
					'Form',
					['Form', 'Form Fieldset', 'Form Field', 'Form Field Group', 'Fields', 'Form Buttons'],
					'HeaderBar',
					'Icon',
					'Inline Editing',
					'Inline Message',
					'Layout',
					'Link',
					'Loading',
					'Menu',
					'Modal',
					'Popover',
					'Skeleton',
					'Stepper',
					['Stepper', 'Step'],
				],
			],
		} /**/,
	},
};

export const decorators = [
	(Story, context) => {
		i18n.changeLanguage(context.globals?.locale);
		const theme = getTheme(context.globals?.theme);
		return (
			<I18nextProvider i18n={i18n}>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				<ThemeProvider theme={theme}>
					<ThemeProvider.GlobalStyle />
					<StorybookGlobalStyle />
					<React.Suspense fallback={null}>
						<Story {...context} />
					</React.Suspense>
				</ThemeProvider>
			</I18nextProvider>
		);
	},
];
