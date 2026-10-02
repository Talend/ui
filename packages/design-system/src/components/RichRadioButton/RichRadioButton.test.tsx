import { render } from '@testing-library/react';

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
});
