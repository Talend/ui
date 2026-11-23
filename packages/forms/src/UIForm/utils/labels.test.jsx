import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getLabelProps } from './labels';

describe('getLabelProps', () => {
	it('should keep allowed props', () => {
		const onClick = vi.fn();
		const labelProps = {
			id: 'label',
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

	it('should drop the `is` custom-element switch and non-function `on*` attributes', () => {
		const onClick = vi.fn();
		const props = getLabelProps('Title', {
			is: 'x-l',
			IS: 'x-l',
			onmouseover: 'alert(1)',
			onclick: 'alert(1)',
			onFocus: 'alert(1)',
			onMouseOver: 'alert(1)',
			lang: 'fr',
			onClick,
		});
		expect(props).toEqual({ children: 'Title', lang: 'fr', onClick });
	});

	it('should not render `is` nor inline handler attributes on the label', () => {
		render(
			<label
				data-testid="label"
				{...getLabelProps('Title', { is: 'x-l', onmouseover: 'alert(1)', onclick: 'alert(1)' })}
			/>,
		);
		const label = screen.getByTestId('label');
		expect(label).not.toHaveAttribute('is');
		expect(label).not.toHaveAttribute('onmouseover');
		expect(label).not.toHaveAttribute('onclick');
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
				<label
					htmlFor="field"
					data-testid="label"
					{...getLabelProps('Title', { htmlFor: 'other', style: {} })}
				/>
				<input id="field" />
			</main>,
		);
		expect(screen.getByRole('textbox', { name: 'Title' })).toHaveAttribute('id', 'field');
		expect(screen.getByTestId('label')).toHaveAttribute('for', 'field');
		expect((await axe(document.body)).violations).toEqual([]);
	});
});
