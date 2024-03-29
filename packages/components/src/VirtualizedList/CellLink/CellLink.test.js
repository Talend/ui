import { render, screen } from '@testing-library/react';
import CellLink from './CellLink.component';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';
jest.unmock('@talend/design-system');

describe('CellLink', () => {
	it('should default render a link', () => {
		// given
		render(
			<BrowserRouter>
				<CellLink
					cellData="Link to my website"
					columnData={{
						linkAs: <RouterLink to="/documentation"></RouterLink>,
						'data-testid': 'my-data-test-id',
					}}
				/>
			</BrowserRouter>,
		);
		// then link is generated
		expect(screen.getByRole('link', { name: 'Link to my website' })).toHaveAttribute(
			'href',
			'/documentation',
		);

		// then data attributes can be passed
		expect(screen.getByTestId('my-data-test-id')).toBeInTheDocument();
	});
});
