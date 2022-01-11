import React from 'react';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { useLocalStorage } from 'react-use';

import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

import { addons } from '@storybook/addons';

import { DocsContainer } from '@storybook/addon-docs';
import { UPDATE_GLOBALS, SET_STORIES } from '@storybook/core-events';
import { TableOfContents, BackToTop } from 'storybook-docs-toc';

import 'focus-outline-manager';

import i18n from './i18n';

import { StatusToolbar, FigmaStatus, GitHubStatus, I18nStatus, StorybookStatus } from './docs';
import { Divider, Form, IconsProvider, ThemeProvider } from '../src';

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

let statusByPage = {};
channel.once(SET_STORIES, eventData => {
	statusByPage = Object.entries(eventData.stories).reduce((acc, [name, { title, parameters }]) => {
		['components'].forEach(prefix => {
			if (name.startsWith(prefix)) {
				const pageName = name.replace(`${prefix}-`, '').split('--')[0];
				if (!acc[pageName] && parameters.status) {
					acc[pageName] = parameters.status;
				}
			}
		});
		return acc;
	}, {});
});

export const parameters = {
	docs: {
		container: props => {
			const [hasFigmaIframe, setFigmaIframe] = useLocalStorage('coral--has-figma-iframe', false);
			const [hasDarkMode, setDarkMode] = useLocalStorage('coral--has-dark-mode', false);
			const [hasBootstrapStylesheet, setBootstrapStylesheet] = useLocalStorage(
				'coral--has-bootstrap-stylesheet',
				true,
			);

			const { id, parameters, globals, title } = props.context;

			React.useEffect(() => {
				channel.emit(UPDATE_GLOBALS, {
					globals: { theme: hasDarkMode ? 'dark' : 'light' },
				});
			}, [hasDarkMode]);

			React.useEffect(() => {
				channel.emit('SET_STATUSES_BY_PAGE', statusByPage);
			}, [statusByPage]);

			const { theme } = globals;
			React.useEffect(() => {
				const hasDarkModeFromToolbar = theme === 'dark';
				if (hasDarkModeFromToolbar != hasDarkMode) {
					setDarkMode(hasDarkModeFromToolbar);
				}
			}, [theme]);

			React.useEffect(() => {
				document
					.querySelectorAll('#bootstrap-theme')
					.forEach(link => (link.disabled = !hasBootstrapStylesheet));
			}, [hasBootstrapStylesheet]);

			const titleArray = title?.split('/');

			const docsTitle = title?.replaceAll(/\//gi, ' / ');
			const docsCategory = titleArray[0];

			const { status = {}, figmaLink } = parameters;

			const githubLink =
				'https://github.com/Talend/ui/tree/master/packages/design-system/' +
				parameters.fileName
					.split('/')
					.slice(1, parameters.fileName.split('/').length - 1)
					.join('/')
					.replace('/docs', '');

			return (
				<>
					<Helmet>
						<title>{docsTitle}</title>
						<meta property="og:title" content={titleArray[titleArray.length - 1]} />
						<meta property="og:type" content="article" />
						<meta property="og:url" content={`https://design.talend.com/?path=/docs/${id}`} />
						<meta
							property="og:image"
							content={`https://via.placeholder.com/1000x500/F3F3F3/FF6D70?text=${docsTitle}`}
						/>
						{titleArray.length > 1 && <meta property="article:section" content={docsCategory} />}
					</Helmet>

					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					<TableOfContents>
						{['component', 'template', 'page'].find(term =>
							docsCategory.toLocaleLowerCase().includes(term),
						) && (
							<ThemeProvider theme={light}>
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

					{status && (
						<StatusToolbar>
							<FigmaStatus status={status.figma} href={figmaLink} />
							<StorybookStatus status={status.storybook} />
							<GitHubStatus status={status.react} href={githubLink} />
							<I18nStatus status={status.i18n} />
						</StatusToolbar>
					)}

					<I18nextProvider i18n={i18n}>
						<ThemeProvider theme={hasDarkMode ? dark : light}>
							<ThemeProvider.GlobalStyle />
							<StorybookGlobalStyle hasFigmaIframe={hasFigmaIframe} />
							<DocsContainer {...props} />
						</ThemeProvider>
					</I18nextProvider>

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
		const { globals = {}, viewMode } = context;

		const { locale: localeKey, theme: themeKey } = globals;
		if (localeKey) i18n.changeLanguage(localeKey);
		const theme = getTheme(themeKey);

		const themedStory = (
			<ThemeProvider theme={theme}>
				<ThemeProvider.GlobalStyle />
				<Story {...context} />
			</ThemeProvider>
		);

		return viewMode === 'docs' ? (
			themedStory
		) : (
			<I18nextProvider i18n={i18n}>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				{themedStory}
			</I18nextProvider>
		);
	},
];
