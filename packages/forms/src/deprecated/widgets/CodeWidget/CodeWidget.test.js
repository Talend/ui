import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReactAce from 'react-ace';
import CodeWidget from './CodeWidget.component';

jest.mock('ally.js');

describe('CodeWidget', () => {
	it('should be AceCodeWidget', () => {
		expect(CodeWidget.displayName).toBe('AceCodeWidget');
	});

	it('should render ReactAce', async () => {
		window.React = React;
		window.ReactDOM = ReactDOM;
		window.ReactAce = { default: ReactAce };
		const formContext = {
			codeWidgetOnLoad: jest.fn(),
		};
		const wrapper = render(<CodeWidget formContext={formContext} />);
		await waitFor(
			() =>
				new Promise(resolve => {
					setTimeout(() => {
						resolve(true);
					}, 200);
				}),
			{ timeout: 300 },
		);
		// eslint-disable-next-line testing-library/no-container
		const input = wrapper.container.querySelector('textarea');
		expect(input).toBeInTheDocument();
		expect(input.tagName).toBe('TEXTAREA');
	});
});
