import React from 'react';

import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

import { DocsContainer } from '@storybook/blocks';

import '@talend/storybook-docs/dist/globalStyles.min.css';

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

import 'focus-outline-manager';
import { create } from '@storybook/theming';
import { themeDark, themeLight } from '@talend/storybook-docs';

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

// const channel = addons.getChannel();

// let statusByPage = {};
// channel.once(SET_STORIES, eventData => {
// 	statusByPage = Object.entries(eventData.stories).reduce(
// 		(acc, [name, { title, componentId, parameters }]) => {
// 			['components', 'templates', 'pages', 'wip-components'].forEach(prefix => {
// 				if (name.toLocaleLowerCase().startsWith(prefix)) {
// 					if (!acc[componentId]) {
// 						acc[componentId] = {
// 							title,
// 							componentId,
// 							parameters,
// 						};
// 					}
// 				}
// 			});
// 			return acc;
// 		},
// 		{},
// 	);
// });

export const parameters = {
	docs: {
		// toc: {
		// 	// warning it's broken
		// 	headingSelector: 'h1, h2, h3',
		// 	title: 'Table of Contents',
		// 	disable: false,
		// 	unsafeTocbotOptions: {
		// 		orderedList: false,
		// 	},
		// },
		container: ({ children, context }) => {
			// 	// useEffect(() => {
			// 	// 	channel.emit('SET_STATUSES_BY_PAGE', statusByPage);
			// 	// }, [statusByPage]);

			const themeKey = context.store.globals.globals.theme || 'light';
			const theme = create(
				{
					light: themeLight,
					dark: themeDark,
				}[themeKey],
			);

			return (
				<div data-theme={themeKey}>
					<DocsContainer context={context} theme={theme}>
						{children}
					</DocsContainer>
				</div>
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
				[
					'About tokens',
					'Light',
					[
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
					],
				],
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
		},
	},
};
