import React from 'react';
import { render, screen } from '@testing-library/react';

import Emphasis from './Emphasis.component';

describe('Emphasis', () => {
	const props = {
		text: 'The lazy quick brown fox jumps over the lazy dog',
	};

	it('should return a span containing the emphatised text', () => {
		// given
		render(<Emphasis {...props} value="brown" />);

		// then
		expect(screen.getByText('brown')).toHaveClass('theme-highlight');
	});

	it('should be case insensitive', () => {
		// given
		render(<Emphasis {...props} value="bRoWn" />);

		// then
		expect(screen.getByText('brown')).toHaveClass('theme-highlight');
	});

	it('should support special chars', () => {
		// given
		render(<Emphasis text="aze.*+?^${}()|[]\wxc" value=".*+?^${}()|[]\" />);

		// then
		expect(screen.getByText('.*+?^${}()|[]\\')).toHaveClass('theme-highlight');
	});

	it('should wrap the original text in a span if no value is provided', () => {
		// when
		render(<Emphasis {...props} />);

		// then
		expect(screen.getByText(props.text)).not.toHaveClass('theme-highlight');
	});

	it('should not emphasise anything if the value is not part of the text', () => {
		// given
		render(<Emphasis {...props} value="nopnopnop" />);

		// then
		expect(screen.getByText(props.text)).not.toHaveClass('theme-highlight');
	});

	it('should emphasise every occurences', () => {
		// given
		render(<Emphasis {...props} value="lazy" />);

		// then
		const nodes = screen.getAllByText('lazy');
		for (const node of nodes) {
			expect(node).toHaveClass('theme-highlight');
		}
		expect(nodes.length).toBe(2);
	});

	it('should emphasize if value is not string', () => {
		const text = 85;
		// given
		render(<Emphasis text={85} value={8} />);

		// then
		expect(screen.getByText('8')).toHaveClass('theme-highlight');
	});

	it('should emphasize multiple words', () => {
		// given
		render(<Emphasis {...props} value={['lazy', 'fox', 'dog']} />);

		// then
		const nodes = screen.getAllByText(/lazy|fox|dog/);
		for (const node of nodes) {
			expect(node).toHaveClass('theme-highlight');
		}
		expect(nodes.length).toBe(4);
	});

	it('should emphasize multiple substrings', () => {
		// given
		render(<Emphasis {...props} value={['quick brown fox', 'lazy dog']} />);

		// then
		const nodes = screen.getAllByText(/quick brown fox|lazy dog/);
		for (const node of nodes) {
			expect(node).toHaveClass('theme-highlight');
		}
		expect(nodes.length).toBe(2);
	});
});
