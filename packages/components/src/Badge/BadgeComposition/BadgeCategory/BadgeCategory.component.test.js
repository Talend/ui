import { screen, render } from '@testing-library/react';
import BadgeCategory from './BadgeCategory.component';

describe('BadgeCategory', () => {
	it('should render with the label', () => {
		// given
		const label = 'my badge label';
		// when
		render(<BadgeCategory label={label} />);
		// then
		expect(screen.getByText(label)).toBeInTheDocument();
	});
});
