import { screen, render } from '@testing-library/react';
import BadgeLabel from './BadgeLabel.component';

jest.unmock('@talend/design-system');

describe('BadgeLabel', () => {
	it('should default render', () => {
		// given
		const label = 'my label';
		// when
		render(<BadgeLabel label={label} />);
		// then
		expect(screen.getByText(label)).toBeInTheDocument();
	});
	it('should render with category', () => {
		// given
		const label = 'my label';
		const category = 'my category';
		// when
		render(<BadgeLabel label={label} category={category} />);
		// then
		expect(screen.getByText(label)).toBeInTheDocument();
		expect(screen.getByText(label)).toHaveClass('tc-badge-label-text-with-categ');
	});
	it('should render with children', () => {
		// given
		const label = 'my label';
		const childText = 'Composition is the key to use React correctly';
		// when
		render(
			<BadgeLabel label={label}>
				<div id="my child">{childText}</div>
			</BadgeLabel>,
		);
		// then
		expect(screen.getByText(childText)).toBeInTheDocument();
		expect(screen.getByText(childText)).toHaveAttribute('id', 'my child');
	});
});
