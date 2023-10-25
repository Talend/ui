import { screen, render } from '@testing-library/react';

import SkipLinks from './SkipLinks.component';

describe('Skip links', () => {
	it('should render', () => {
		// when
		const { container } = render(
			<SkipLinks mainId="#my-custom-main-id" navigationId="#my-custom-nav-id" />,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render only main link', () => {
		// when
		render(<SkipLinks mainId="#my-custom-main-id" />);

		// then
		expect(screen.getByText('Skip to main content')).toBeVisible();
		expect(screen.queryByText('Skip to navigation')).not.toBeInTheDocument();
	});
});
