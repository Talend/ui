import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { RichRadioButton } from './RichRadioButton.component';

describe('RichRadioButton', () => {
	it('should not forward unknown asset keys to the icon', () => {
		const asset = { name: 'talend-warning', 'data-unexpected': 'x', fill: 'red' } as any;
		const { container } = render(
			<RichRadioButton id="a" name="n" title="t" onChange={vi.fn()} asset={asset} />,
		);
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
		expect(svg?.getAttribute('data-unexpected')).toBeNull();
		expect(svg?.getAttribute('fill')).not.toBe('red');
	});

	it('should render a11y html', async () => {
		const { container } = render(
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
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
