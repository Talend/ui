import { screen, render, configure } from '@testing-library/react';
import Badge from './Badge.component';

configure({ testIdAttribute: 'data-test' });

describe('Badge', () => {
	it('should render by default', () => {
		// given
		const label = 'my label';

		// when
		render(<Badge label={label} />);

		// then
		expect(screen.getByText(label)).toBeInTheDocument();
	});

	it('should render the given children', () => {
		// when
		render(
			<Badge>
				<div data-test="testId">children</div>
			</Badge>,
		);

		// then
		expect(screen.getByTestId('testId')).toBeInTheDocument();
	});
});
