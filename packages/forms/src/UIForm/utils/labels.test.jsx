import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getLabelProps } from './labels';

describe('getLabelProps', () => {
	it('keeps ordinary props and trusted callbacks', () => {
		const props = {
			id: 'label',
			className: 'custom-label',
			title: 'Title',
			lang: 'fr',
			'data-testid': 'field.label',
			'aria-label': 'Label',
			onClick: vi.fn(),
		};
		expect(getLabelProps('Title', props)).toEqual({ children: 'Title', ...props });
	});

	it('protects generated content, label targets and layout', () => {
		expect(
			getLabelProps('Title', {
				htmlFor: 'other',
				for: 'other',
				style: { position: 'fixed', inset: 0 },
				children: 'Other title',
				required: false,
				dangerouslySetInnerHTML: { __html: '<img src="x" />' },
			}),
		).toEqual({ children: 'Title' });
	});

	it('applies the same exclusions when a hint is provided', () => {
		const props = getLabelProps(
			'Title',
			{ htmlFor: 'other', style: {}, children: 'Other title' },
			{ icon: 'talend-info-circle', overlayComponent: 'Hint' },
			true,
		);
		expect(props.htmlFor).toBeUndefined();
		expect(props.style).toBeUndefined();
		expect(props.children).not.toBe('Other title');
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
		expect((await axe(document.body)).violations).toEqual([]);
	});
});
