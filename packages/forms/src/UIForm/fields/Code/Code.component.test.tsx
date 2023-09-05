/* eslint-disable testing-library/no-container */
import * as React from 'react';
import ReactAce from 'react-ace';
import ReactDOM from 'react-dom';

import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import 'ace-builds/src-noconflict/ext-language_tools';

import Code, { CodeProps } from './Code.component';

// fix cannot read appendChild of null;
jest.mock('ally.js');

declare global {
	interface Window {
		ReactAce: { default: typeof ReactAce };
	}
}

describe('Code field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		title: 'My input title',
		type: 'code',
	};

	const props = {
		id: 'myCodeWidget',
		schema,
		onChange: jest.fn(),
		onFinish: jest.fn(),
		value: 'toto',
	};

	async function initWith(dprops: CodeProps) {
		window.React = React;
		window.ReactDOM = ReactDOM;
		window.ReactAce = { default: ReactAce };
		render(<Code {...dprops} />);
		await waitFor(
			() =>
				new Promise(resolve => {
					setTimeout(() => {
						resolve(true);
					}, 10);
				}),
		);
	}

	it('should render ace-editor in FieldTemplate', async () => {
		// when

		await initWith(props);
		const input = await screen.findByLabelText('My input title');
		expect(input).toBeInTheDocument();
		expect(input.tagName).toBe('TEXTAREA');

		expect(screen.getByTestId('widget-code-instructions')).toBeInTheDocument();
	});

	it('should render without instructions', async () => {
		await initWith({ ...props, showInstructions: false });
		const input = await screen.findByLabelText('My input title');
		expect(input).toBeInTheDocument();
		expect(input.tagName).toBe('TEXTAREA');

		expect(screen.queryByTestId('widget-code-instructions')).not.toBeInTheDocument();
	});
});
