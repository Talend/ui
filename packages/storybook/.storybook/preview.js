import 'focus-outline-manager';

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocalStorage } from 'react-use';

import { DocsContainer } from '@storybook/addon-docs';
import { addons } from '@storybook/addons';
import { SET_STORIES, UPDATE_GLOBALS } from '@storybook/core-events';
import { default as i18next } from 'i18next';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import { BackToTop, TableOfContents } from 'storybook-docs-toc';

import { Divider, StackVertical, ThemeProvider, ToggleSwitch } from '@talend/design-system';
import { dark, light } from '@talend/design-system';
import {
	namespaces as designSystemNamespaces,
	locales as designSystemLocales,
} from '@talend/locales-design-system';
import {
	namespaces as tuiComponentsNamespaces,
	locales as tuiComponentsLocales,
} from '@talend/locales-tui-components';
import {
	namespaces as tuiContainersNamespaces,
	locales as tuiContainersLocales,
} from '@talend/locales-tui-containers';
import {
	namespaces as tuiFacetedSearchNamespaces,
	locales as tuiFacetedSearchLocales,
} from '@talend/locales-tui-faceted-search';
import {
	namespaces as tuiFormsNamespaces,
	locales as tuiFormsLocales,
} from '@talend/locales-tui-forms';
import '@talend/storybook-docs/dist/globalStyles.min.css';

import { BadgeFigma, BadgeI18n, BadgeReact, Badges, BadgeStorybook } from './docs';

const TokenOrder = [
	'Colors',
	'Color Compositions',
	'Color Charts',
	'Branding',
	'Gradients',
	'Typography',
	'Measures',
	'Opacity',
	'Radius',
	'Borders',
	'Shadows',
	'Transitions',
	'Elevations',
	'Breakpoints',
];

export const i18n = {
	namespaces: [
		...designSystemNamespaces,
		...tuiComponentsNamespaces,
		...tuiContainersNamespaces,
		...tuiFormsNamespaces,
		...tuiFacetedSearchNamespaces,
	],
	locales: Object.keys(designSystemLocales).reduce(
		(resources, language) => ({
			...resources,
			[language]: {
				...designSystemLocales[language],
				...tuiComponentsLocales[language],
				...tuiContainersLocales[language],
				...tuiFacetedSearchLocales[language],
				...tuiFormsLocales[language],
			},
		}),
		{},
	),
};

const channel = addons.getChannel();

let statusByPage = {};
channel.once(SET_STORIES, eventData => {
	statusByPage = Object.entries(eventData.stories).reduce(
		(acc, [name, { title, componentId, parameters }]) => {
			['components', 'templates', 'pages', 'wip-components'].forEach(prefix => {
				if (name.toLocaleLowerCase().startsWith(prefix)) {
					if (!acc[componentId]) {
						acc[componentId] = {
							title,
							componentId,
							parameters,
						};
					}
				}
			});
			return acc;
		},
		{},
	);
});

export const parameters = {
	docs: {
		container: props => {
			const [hasDarkMode, setDarkMode] = useLocalStorage('coral--has-dark-mode', false);
			const [hasBootstrapStylesheet, setBootstrapStylesheet] = useLocalStorage(
				'coral--has-bootstrap-stylesheet',
				true,
			);

			const { id, parameters, globals, title } = props.context;

			const hasDarkTheme = title.toLocaleLowerCase().includes('dark');

			useEffect(() => {
				channel.emit(UPDATE_GLOBALS, {
					globals: { theme: hasDarkMode ? 'dark' : 'light' },
				});
			}, [hasDarkMode]);

			useEffect(() => {
				channel.emit('SET_STATUSES_BY_PAGE', statusByPage);
			}, [statusByPage]);

			const { theme, locale } = globals;
			useEffect(() => {
				const hasDarkModeFromToolbar = theme === 'dark';
				if (hasDarkModeFromToolbar != hasDarkMode) {
					setDarkMode(hasDarkModeFromToolbar);
				}
			}, [theme]);

			useEffect(() => {
				document
					.querySelectorAll('#bootstrap-theme')
					.forEach(link => (link.disabled = !hasBootstrapStylesheet));
			}, [hasBootstrapStylesheet]);

			useEffect(() => {
				i18next.changeLanguage(locale);
			}, [locale]);

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

			const isDesignSystemElementPage = ['design system'].find(term => {
				return title?.toLocaleLowerCase().startsWith(term);
			});

			function DarkThemeWrapper({ children }) {
				if (hasDarkTheme) {
					return <div data-theme="dark">{children}</div>;
				}

				return <>{children}</>;
			}

			return (
				<>
					<DarkThemeWrapper>
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

						<TableOfContents>
							{isDesignSystemElementPage && (
								<ThemeProvider theme={light}>
									<StackVertical
										gap="XXS"
										padding={{ top: 'XS', left: '0', right: '0', bottom: '0' }}
									>
										<Divider />
										<ToggleSwitch
											label={'Dark mode'}
											onChange={() => {
												setDarkMode(!hasDarkMode);
											}}
											checked={hasDarkMode}
										/>
										<ToggleSwitch
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
									</StackVertical>
								</ThemeProvider>
							)}
						</TableOfContents>

						{isDesignSystemElementPage && status && (
							<Badges>
								<BadgeFigma status={status.figma} href={figmaLink} />
								<BadgeStorybook status={status.storybook} />
								<BadgeReact status={status.react} href={githubLink} />
								<BadgeI18n status={status.i18n} />
							</Badges>
						)}

						<ThemeProvider theme={hasDarkMode ? dark : light}>
							<DocsContainer {...props} />
						</ThemeProvider>

						<BackToTop />
					</DarkThemeWrapper>
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
			method: 'alphabetical',
			order: [
				'Welcome',
				'Getting Started',
				'Component catalog',
				'Content',
				'Design Tokens',
				['About tokens', 'Light', TokenOrder, 'Dark', TokenOrder],
				'Design System',
				[
					'Accordion',
					'Badge',
					'Breadcrumbs',
					'Clickable (Buttons)',
					['About', 'Button', 'ButtonAsLink', 'ButtonIcon'],
					'Combobox',
					'Divider',
					'Drawer',
					'Dropdown',
					'EmptyState',
					'ErrorState',
					'Form',
					[
						'About',
						'Form',
						'Form Fieldset',
						'Form Fields',
						['About', 'Prefix, Suffix'],
						'Form Field Group',
						'Fields',
						'Form Buttons',
					],
					'HeaderBar',
					'Icon',
					['About', 'Icon (legacy)', 'SizedIcon'],
					'Inline Editing',
					'Inline Message',
					'Layout',
					'Link',
					'Loading',
					'Message',
					'Menu',
					'Modal',
					'Popover',
					'Skeleton',
					'Stepper',
					['Stepper', 'Step'],
					'Tag',
					'Tabs',
					'Tooltip',
				],
			],
		} /**/,
	},
};

export const decorators = [
	(Story, context) => {
		const { globals = {} } = context;

		const { locale: localeKey, theme: themeKey } = globals;

		//TODO: backport theme switcher to scripts-config-storybook and remove this
		return (
			<ThemeProvider theme={themeKey}>
				<Story {...context} />
			</ThemeProvider>
		);
	},
];
