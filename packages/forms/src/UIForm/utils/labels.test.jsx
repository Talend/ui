import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getLabelProps } from './labels';

describe('getLabelProps', () => {
	it('should keep allowed props', () => {
		const onClick = vi.fn();
		const labelProps = {
			'data-testid': 'a',
			'aria-label': 'b',
			title: 'c',
			className: 'd',
			lang: 'fr',
			onClick,
		};
		const props = getLabelProps('Title', labelProps);
		expect(props).toEqual({
			children: 'Title',
			...labelProps,
		});
	});

	it('should drop blocklisted props while preserving ordinary props', () => {
		const onClick = vi.fn();
		const props = getLabelProps('Title', {
			htmlFor: 'other',
			for: 'other',
			style: { position: 'fixed' },
			children: 'x',
			required: true,
			componentClass: 'iframe',
			dangerouslySetInnerHTML: { __html: '<img src="x" />' },
			lang: 'fr',
			onClick,
		});
		expect(props).toEqual({ children: 'Title', lang: 'fr', onClick });
	});

	it('should drop unsupported props when a hint is set', () => {
		const props = getLabelProps(
			'Title',
			{ htmlFor: 'other', style: {}, children: 'Other title' },
			{ icon: 'i' },
			true,
		);
		expect(props.htmlFor).toBeUndefined();
		expect(props.style).toBeUndefined();
		expect(props.required).toBe(false);
	});

	it('handles absent label props', () => {
		expect(getLabelProps('Title')).toEqual({ children: 'Title' });
	});

	it('preserves the real input association and renders a11y html', async () => {
		render(
			<main>
				<label htmlFor="field" {...getLabelProps('Title', { htmlFor: 'other', style: {} })} />
				<input id="field" />
			</main>,
		);
		expect(screen.getByRole('textbox', { name: 'Title' })).toHaveAttribute('id', 'field');
		expect(await axe(document.body)).toHaveNoViolations();
	});
});
