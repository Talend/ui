import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RichRadioButton } from './RichRadioButton.component';

describe('RichRadioButton', () => {
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
					id="choice"
					name="choices"
					title="Choice"
					onChange={vi.fn<() => void>()}
					asset={{ name: 'talend-warning' }}
				/>
			</main>,
		);
		expect((await axe(document.body)).violations).toEqual([]);
	});
});
