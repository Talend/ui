import React from 'react';

import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

import { IconsProvider, ThemeProvider, themes } from '@talend/design-system';
import { DocsContainer } from '@storybook/addon-docs';


import 'focus-outline-manager';



export const parameters = {
	docs: {
		container: props => {
			return (
				<>
					<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
					<ThemeProvider theme={themes.light}>
						<DocsContainer {...props} />
					</ThemeProvider>
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
};

export const decorators = [
	(Story, context) => {
		const { viewMode } = context;
		const themedStory = (
			<ThemeProvider theme={themes.light}>
				<Story {...context} />
			</ThemeProvider>
		);

		return viewMode === 'docs' ? (
			themedStory
		) : (
			<>
				<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
				{themedStory}
			</>
		);
	},
];
