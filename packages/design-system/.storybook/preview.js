import React from 'react';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { useLocalStorage } from 'react-use';

import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

import { addons } from '@storybook/addons';

import { themes } from '@storybook/theming';
import { DocsContainer } from '@storybook/addon-docs';
import { SET_STORIES } from '@storybook/core-events';
import { TableOfContents, BackToTop } from 'storybook-docs-toc';
import {
	DARK_MODE_EVENT_NAME,
	UPDATE_DARK_MODE_EVENT_NAME,
	useDarkMode,
} from 'storybook-dark-mode';

import 'focus-outline-manager';

import i18n from './i18n';
import theme from './theme';

import { BadgeFigma, BadgeStorybook, BadgeReact, BadgeI18n, Badges } from './docs';
import { Divider, Form, IconsProvider, ThemeProvider } from '../src';

import { light, dark } from '../src/themes';

export const globalTypes = {
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

const StorybookGlobalStyle = ThemeProvider.createGlobalStyle(
	({ theme, hasFigmaIframe }) =>
		`
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
	statusByPage = Object.entries(eventData.stories).reduce(
		(acc, [name, { title, componentId, parameters }]) => {
			['components', 'templates', 'pages'].forEach(prefix => {
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

const isPreferringDark =
    typeof window !== 'undefined'
        ? window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        : null

export const parameters = {
	darkMode: {
		dark: { ...themes.dark, ...theme('dark') },
		light: { ...themes.light, ...theme('light') },
	},
	docs: {
		container: props => {
			const [hasFigmaIframe, setFigmaIframe] = useLocalStorage('coral--has-figma-iframe', false);
			const [isDark, setDark] = useLocalStorage('coral--has-dark-mode', isPreferringDark);

			const [hasBootstrapStylesheet, setBootstrapStylesheet] = useLocalStorage(
				'coral--has-bootstrap-stylesheet',
				true,
			);

			const { id, parameters, title, storyById } = props.context;
			const {
				parameters: { docs = {} },
			} = storyById(id);
			docs.theme = isDark ? themes.dark : themes.light;

			React.useEffect(() => {
				channel.emit('SET_STATUSES_BY_PAGE', statusByPage);
			}, [statusByPage]);

			React.useEffect(() => {
				channel.on(DARK_MODE_EVENT_NAME, setDark);
				return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
			}, [channel, setDark]);

			React.useEffect(() => {
				document
					.querySelectorAll('#bootstrap-theme')
					.forEach(link => (link.disabled = !hasBootstrapStylesheet));
			}, [hasBootstrapStylesheet]);

			const onChangeHandler = () => {
				channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
			};

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

			const isDesignSystemElementPage = ['components/', 'templates/', 'pages/'].find(term =>
				title?.toLocaleLowerCase().startsWith(term),
			);

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
						{isDesignSystemElementPage && (
							<ThemeProvider theme={light}>
								<Divider />
								<Form.Switch label={'Dark mode'} onChange={onChangeHandler} checked={isDark} />
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

					{isDesignSystemElementPage && status && (
						<Badges>
							<BadgeFigma status={status.figma} href={figmaLink} />
							<BadgeStorybook status={status.storybook} />
							<BadgeReact status={status.react} href={githubLink} />
							<BadgeI18n status={status.i18n} />
						</Badges>
					)}

					<I18nextProvider i18n={i18n}>
						<ThemeProvider theme={isDark ? dark : light}>
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
					return format(body)
						.trim()
						.replace(/;$/, '');
				}
				// try to format JSX
				// remove last semicolon added by Prettier
				return format(input)
					.trim()
					.replace(/;$/, '');
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
				'Themes',
				'Content',
				'Components',
				[
					'Accordion',
					'Breadcrumbs',
					'Clickable (Buttons)',
					['About', 'Button', 'ButtonAsLink', 'ButtonIcon'],
					'Combobox',
					'Divider',
					'Drawer',
					'Dropdown',
					'EmptyState',
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
				'[Deprecated] Design Tokens',
			],
		} /**/,
	},
};

export const decorators = [
	(Story, context) => {
		const { globals = {}, viewMode } = context;

		const { locale: localeKey } = globals;
		if (localeKey) i18n.changeLanguage(localeKey);
		const theme = useDarkMode() ? dark : light;

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
