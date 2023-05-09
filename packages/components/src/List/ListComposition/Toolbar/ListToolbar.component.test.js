import { render, screen } from '@testing-library/react';
import ListToolbar from './ListToolbar.component';

describe('List Toolbar', () => {
	it('should display nav with children', () => {
		// when
		render(
			<ListToolbar>
				<div>Hello</div>
			</ListToolbar>,
		);

		// then
		expect(screen.getByRole('navigation')).toBeVisible();
		expect(screen.getByText('Hello')).toBeVisible();
	});
	it('should display nav with li and separator', () => {
		// when
		const { container } = render(
			<ListToolbar>
				<ListToolbar.Right>
					<div>Hello</div>
					<div>World</div>
				</ListToolbar.Right>
			</ListToolbar>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
