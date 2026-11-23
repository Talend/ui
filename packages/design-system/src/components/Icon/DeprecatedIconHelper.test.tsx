import { render } from '@testing-library/react';

import { getIconWithDeprecatedSupport } from './DeprecatedIconHelper';

describe('getIconWithDeprecatedSupport', () => {
	it('should render a React element icon', () => {
		const { container } = render(
			<>{getIconWithDeprecatedSupport({ iconSrc: <svg data-testid="custom" />, size: 'S' })}</>,
		);
		expect(container.querySelector('svg[data-testid="custom"]')).toBeInTheDocument();
	});

	it('should not render a plain object as a React element', () => {
		const iconSrc = {
			type: 'iframe',
			props: { srcDoc: '<script>alert(1)</script>' },
			ref: null,
		} as any;
		const { container } = render(<>{getIconWithDeprecatedSupport({ iconSrc, size: 'S' })}</>);
		expect(container.querySelector('iframe')).toBeNull();
		expect(container).toBeEmptyDOMElement();
	});
});
