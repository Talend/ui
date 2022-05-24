/* eslint-disable testing-library/no-container */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactAce from 'react-ace';
import Code from './Code.component';

// fix cannot read appendChild of null;
jest.mock('ally.js');

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

	async function initWith(dprops) {
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
	});
});
