import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RichRadioButton } from './RichRadioButton.component';

describe('RichRadioButton', () => {
	it('should not forward unknown asset keys to the icon', () => {
		const asset = {
			name: 'talend-warning',
			'data-testid': 'radio.icon',
			'data-unexpected': 'x',
			fill: 'red',
			componentClass: 'iframe',
			dangerouslySetInnerHTML: { __html: '<image data-injected="true" />' },
		} as any;
		const { container } = render(
			<RichRadioButton id="a" name="n" title="t" onChange={vi.fn()} asset={asset} />,
		);
		const icon = screen.getByTestId('radio.icon');
		expect(icon).toHaveAttribute('data-unexpected', 'x');
		expect(icon).toHaveAttribute('fill', 'red');
		expect(document.querySelector('iframe')).toBeNull();
		expect(container.querySelector('[data-injected]')).toBeNull();
	});

	it('blocks unsafe asset props without discarding ordinary SVG attributes', () => {
		const asset = {
			name: 'talend-warning',
			'data-testid': 'radio.icon',
			fill: 'red',
			style: { position: 'fixed' },
			iconSrc: 'remote-injected',
			dangerouslySetInnerHTML: { __html: '<image data-injected="true" />' },
		};
		const { container } = render(
			<RichRadioButton
				id="choice"
				name="choices"
				title="Choice"
				onChange={vi.fn<() => void>()}
				asset={asset}
			/>,
		);
		const icon = screen.getByTestId('radio.icon');
		expect(icon).toHaveAttribute('fill', 'red');
		expect(icon).toHaveAttribute('name', 'talend-warning');
		expect(icon).not.toHaveAttribute('style');
		expect(container.querySelector('[data-injected]')).toBeNull();
	});

	it('should render a11y html', async () => {
		render(
			<main>
				<RichRadioButton
					id="a"
					name="n"
					title="t"
					onChange={vi.fn()}
					asset={{ name: 'talend-warning' }}
				/>
			</main>,
		);
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
