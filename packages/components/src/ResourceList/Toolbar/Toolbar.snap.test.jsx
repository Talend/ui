import { screen, render } from '@testing-library/react';
import Toolbar from './Toolbar.component';

describe('Toolbar component snaps', () => {
	it('should render Toolbar with every widgets', () => {
		const { container } = render(<Toolbar name={{}} sort={{}} state={{}} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render Toolbar without name widget', () => {
		render(<Toolbar sort={{}} state={{}} />);
		expect(screen.queryByRole('search')).not.toBeInTheDocument();
	});

	it('should render Toolbar without sort widgets', () => {
		render(<Toolbar name={{}} state={{}} />);
		expect(screen.queryByText('Sort:')).not.toBeInTheDocument();
	});

	it('should render Toolbar without state widgets', () => {
		render(<Toolbar name={{}} sort={{}} />);
		expect(screen.queryByText('Filter:')).not.toBeInTheDocument();
	});
});
